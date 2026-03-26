from functools import lru_cache
from decimal import Decimal

from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_env: str = "local"
    event_order_amount: Decimal = Decimal("15000.00")
    admin_username: str = "admin"
    admin_password: str = "change-me"
    admin_session_secret: str = "change-this-session-secret"
    admin_session_cookie_name: str = "toi_duman_admin_session"
    admin_session_max_age_seconds: int = 60 * 60 * 24 * 7

    postgres_host: str = "localhost"
    postgres_port: int = 5432
    postgres_db: str = "toi-duman"
    postgres_user: str = "postgres"
    postgres_password: str = "postgres"
    database_url: str | None = None

    r2_account_id: str | None = None
    r2_access_key_id: str | None = None
    r2_secret_access_key: str | None = None
    r2_bucket_name: str | None = None
    r2_public_base_url: str | None = None
    r2_upload_prefix: str = "events/covers"

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

    @computed_field
    @property
    def r2_endpoint_url(self) -> str | None:
        if not self.r2_account_id:
            return None
        return f"https://{self.r2_account_id}.r2.cloudflarestorage.com"


@lru_cache
def get_settings() -> Settings:
    return Settings()
