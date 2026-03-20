from datetime import datetime, timedelta, timezone

from sqlalchemy import select

from app.core.config import get_settings
from app.core.security import (
    generate_password,
    generate_verification_code,
    hash_password,
    validate_new_password,
    verify_password,
)
from app.core.id_generator import generate_id, get_prefix_for_role
from app.core.user_identity import parse_public_user_id
from app.models.user import User
from app.repositories.base import BaseRepository


class UserRepository(BaseRepository[User]):
    model = User

    async def _generate_unique_user_id(self, role: str) -> str:
        while True:
            candidate = generate_id(role)
            existing_user = await self.get_by_id(candidate)
            if existing_user is None:
                return candidate

    async def create(self, data: dict) -> tuple[User, str]:
        payload = dict(data)
        generated_password = generate_password()
        if "id" not in payload:
            payload["id"] = await self._generate_unique_user_id(payload["role"])
        payload["prefix"] = get_prefix_for_role(payload["role"])
        payload["password_hash"] = hash_password(generated_password)
        user = await super().create(payload)
        return user, generated_password

    async def get_by_public_id(self, public_user_id: str) -> User | None:
        prefix, raw_user_id = parse_public_user_id(public_user_id)
        statement = select(self.model).where(
            self.model.id == raw_user_id,
            self.model.prefix == prefix,
        )
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()

    async def authenticate(self, user_id: str, password: str) -> User | None:
        user = await self.get_by_public_id(user_id)
        if user is None:
            return None

        if not verify_password(password, user.password_hash):
            return None

        return user

    async def get_by_email(self, email: str) -> User | None:
        statement = select(self.model).where(self.model.email == email)
        result = await self.session.execute(statement)
        return result.scalar_one_or_none()

    async def start_email_verification(self, user: User, email: str) -> tuple[User, str]:
        existing_user = await self.get_by_email(email)
        if existing_user is not None and existing_user.id != user.id:
            raise ValueError("Email is already in use")

        settings = get_settings()
        code = generate_verification_code()
        user.pending_email = email
        user.email_verification_code_hash = hash_password(code)
        user.email_verification_expires_at = datetime.now(timezone.utc) + timedelta(
            minutes=settings.email_verification_code_expire_minutes
        )

        await self.session.commit()
        await self.session.refresh(user)
        return user, code

    async def verify_email_code(self, user: User, code: str) -> User:
        now = datetime.now(timezone.utc)
        if (
            user.pending_email is None
            or user.email_verification_code_hash is None
            or user.email_verification_expires_at is None
        ):
            raise ValueError("No active email verification request")

        if user.email_verification_expires_at < now:
            raise ValueError("Verification code has expired")

        if not verify_password(code, user.email_verification_code_hash):
            raise ValueError("Invalid verification code")

        user.email = user.pending_email
        user.email_verified_at = now
        user.pending_email = None
        user.email_verification_code_hash = None
        user.email_verification_expires_at = None

        await self.session.commit()
        await self.session.refresh(user)
        return user

    async def clear_email_verification(self, user: User) -> User:
        user.pending_email = None
        user.email_verification_code_hash = None
        user.email_verification_expires_at = None

        await self.session.commit()
        await self.session.refresh(user)
        return user

    async def start_password_reset(self, user: User) -> tuple[User, str]:
        settings = get_settings()
        code = generate_verification_code()
        user.password_reset_code_hash = hash_password(code)
        user.password_reset_expires_at = datetime.now(timezone.utc) + timedelta(
            minutes=settings.email_verification_code_expire_minutes
        )

        await self.session.commit()
        await self.session.refresh(user)
        return user, code

    async def clear_password_reset(self, user: User) -> User:
        user.password_reset_code_hash = None
        user.password_reset_expires_at = None

        await self.session.commit()
        await self.session.refresh(user)
        return user

    async def update_role(self, user_id: str, role: str) -> User | None:
        user = await self.get_by_public_id(user_id)
        if user is None:
            return None

        if user.role.value == role:
            return user

        user.role = role
        user.prefix = get_prefix_for_role(role)

        await self.session.commit()
        await self.session.refresh(user)
        return user

    async def change_password(self, user: User, old_password: str, new_password: str) -> User:
        if not verify_password(old_password, user.password_hash):
            raise ValueError("Current password is incorrect")

        validate_new_password(new_password)

        user.password_hash = hash_password(new_password)
        await self.session.commit()
        await self.session.refresh(user)
        return user

    async def reset_password_by_email(self, email: str, code: str, new_password: str) -> User:
        user = await self.get_by_email(email)
        if user is None:
            raise ValueError("Invalid email or reset code")

        now = datetime.now(timezone.utc)
        if (
            user.password_reset_code_hash is None
            or user.password_reset_expires_at is None
        ):
            raise ValueError("No active password reset request")

        if user.password_reset_expires_at < now:
            raise ValueError("Reset code has expired")

        if not verify_password(code, user.password_reset_code_hash):
            raise ValueError("Invalid email or reset code")

        validate_new_password(new_password)
        user.password_hash = hash_password(new_password)
        user.password_reset_code_hash = None
        user.password_reset_expires_at = None

        await self.session.commit()
        await self.session.refresh(user)
        return user
