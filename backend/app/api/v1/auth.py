from typing import Annotated

from fastapi import APIRouter, Depends, Form, HTTPException, Response, status
from sqlalchemy.ext.asyncio import AsyncSession
import smtplib

from app.api.auth import LoginForm, get_current_user, get_current_user_from_refresh_token
from app.api.dependencies import get_session
from app.core.config import get_settings
from app.core.security import create_access_token, create_refresh_token
from app.models.user import User
from app.repositories.user_repository import UserRepository
from app.schemas.auth import (
    AuthenticatedUser,
    EmailVerificationRequestResponse,
    EmailVerificationResponse,
    LoginResponse,
    PasswordChangeResponse,
    PasswordResetRequestResponse,
    PasswordResetResponse,
    RefreshResponse,
)
from app.schemas.user import UserCreateResponse
from app.services.email_service import (
    render_password_reset_email,
    render_verification_email,
    send_html_email,
)


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/users", response_model=UserCreateResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    role: Annotated[str, Form()],
    session: AsyncSession = Depends(get_session),
) -> UserCreateResponse:
    repository = UserRepository(session)
    user, generated_password = await repository.create({"role": role})
    return UserCreateResponse.model_validate(
        {
            "id": user.public_id,
            "email": user.email,
            "role": user.role.value,
            "email_verified_at": user.email_verified_at,
            "created_at": user.created_at,
            "updated_at": user.updated_at,
            "generated_password": generated_password,
        }
    )


@router.post("/login", response_model=LoginResponse)
async def login(
    response: Response,
    form: LoginForm = Depends(),
    session: AsyncSession = Depends(get_session),
) -> LoginResponse:
    repository = UserRepository(session)
    user = await repository.authenticate(form.identifier, form.password)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect ID, email, or password",
        )

    settings = get_settings()
    access_token = create_access_token(subject=user.public_id, extra_claims={"role": user.role.value})
    refresh_token = create_refresh_token(subject=user.public_id, extra_claims={"role": user.role.value})
    response.set_cookie(
        key=settings.jwt_refresh_cookie_name,
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=settings.jwt_refresh_token_expire_days * 24 * 60 * 60,
    )
    return LoginResponse(access_token=access_token, user_id=user.public_id, role=user.role.value)


@router.post("/refresh", response_model=RefreshResponse)
async def refresh_access_token(
    response: Response,
    current_user = Depends(get_current_user_from_refresh_token),
) -> RefreshResponse:
    settings = get_settings()
    access_token = create_access_token(
        subject=current_user.public_id,
        extra_claims={"role": current_user.role.value},
    )
    refresh_token = create_refresh_token(
        subject=current_user.public_id,
        extra_claims={"role": current_user.role.value},
    )
    response.set_cookie(
        key=settings.jwt_refresh_cookie_name,
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=settings.jwt_refresh_token_expire_days * 24 * 60 * 60,
    )
    return RefreshResponse(access_token=access_token)


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
async def logout(response: Response) -> None:
    settings = get_settings()
    response.delete_cookie(
        key=settings.jwt_refresh_cookie_name,
        httponly=True,
        secure=False,
        samesite="lax",
    )


@router.get("/me", response_model=AuthenticatedUser)
async def get_me(current_user = Depends(get_current_user)) -> AuthenticatedUser:
    return AuthenticatedUser.model_validate(current_user)


@router.post("/email/request-code", response_model=EmailVerificationRequestResponse)
async def request_email_verification_code(
    email: Annotated[str, Form()],
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> EmailVerificationRequestResponse:
    repository = UserRepository(session)
    settings = get_settings()

    try:
        _, code = await repository.start_email_verification(current_user, email)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    subject, html = render_verification_email(code=code, user_id=current_user.public_id)
    try:
        await send_html_email(recipient=email, subject=subject, html=html)
    except (smtplib.SMTPException, OSError) as exc:
        await repository.clear_email_verification(current_user)
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Email service is unavailable. Check SMTP settings.",
        ) from exc

    return EmailVerificationRequestResponse(
        message="Verification code sent",
        email=email,
        expires_in_minutes=settings.email_verification_code_expire_minutes,
    )


@router.post("/email/verify", response_model=EmailVerificationResponse)
async def verify_email(
    code: Annotated[str, Form()],
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> EmailVerificationResponse:
    repository = UserRepository(session)

    try:
        user = await repository.verify_email_code(current_user, code)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    return EmailVerificationResponse(
        message="Email verified successfully",
        email=user.email or "",
    )


@router.post("/change-password", response_model=PasswordChangeResponse)
async def change_password(
    old_password: Annotated[str, Form()],
    new_password: Annotated[str, Form()],
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
) -> PasswordChangeResponse:
    repository = UserRepository(session)

    try:
        await repository.change_password(current_user, old_password, new_password)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    return PasswordChangeResponse(message="Password updated successfully")


@router.post("/forgot-password/request-code", response_model=PasswordResetRequestResponse)
async def request_password_reset_code(
    email: Annotated[str, Form()],
    session: AsyncSession = Depends(get_session),
) -> PasswordResetRequestResponse:
    repository = UserRepository(session)
    settings = get_settings()
    user = await repository.get_by_email(email)

    if user is not None:
        try:
            _, code = await repository.start_password_reset(user)
            subject, html = render_password_reset_email(code=code, user_id=user.public_id)
            await send_html_email(recipient=email, subject=subject, html=html)
        except (smtplib.SMTPException, OSError) as exc:
            await repository.clear_password_reset(user)
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Email service is unavailable. Check SMTP settings.",
            ) from exc

    return PasswordResetRequestResponse(
        message="If the email exists, a reset code has been sent",
        email=email,
        expires_in_minutes=settings.email_verification_code_expire_minutes,
    )


@router.post("/forgot-password/reset", response_model=PasswordResetResponse)
async def reset_forgotten_password(
    email: Annotated[str, Form()],
    code: Annotated[str, Form()],
    new_password: Annotated[str, Form()],
    session: AsyncSession = Depends(get_session),
) -> PasswordResetResponse:
    repository = UserRepository(session)

    try:
        await repository.reset_password_by_email(email, code, new_password)
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc

    return PasswordResetResponse(message="Password reset successfully")
