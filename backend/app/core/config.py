from functools import lru_cache

from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "local"
    jwt_secret_key: str = "change-this-secret-key"
    jwt_algorithm: str = "HS256"
    jwt_access_token_expire_minutes: int = 60
    jwt_refresh_token_expire_days: int = 30
    jwt_refresh_cookie_name: str = "refresh_token"
    email_verification_code_expire_minutes: int = 10
    smtp_host: str = "localhost"
    smtp_port: int = 1025
    smtp_user: str | None = None
    smtp_password: str | None = None
    smtp_from_email: str = "no-reply@toi-duman.local"
    smtp_use_tls: bool = False

    postgres_host: str = "localhost"
    postgres_port: int = 5432
    postgres_db: str = "toi-duman"
    postgres_user: str = "postgres"
    postgres_password: str = "postgres"
    database_url: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    @computed_field
    @property
    def resolved_database_url(self) -> str:
        if self.database_url:
            return self.database_url

        return (
            "postgresql+asyncpg://"
            f"{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )

    @computed_field
    @property
    def alembic_database_url(self) -> str:
        return self.resolved_database_url


@lru_cache
def get_settings() -> Settings:
    return Settings()
