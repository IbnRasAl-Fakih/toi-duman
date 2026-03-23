from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote
from uuid import uuid4

import boto3
from botocore.client import BaseClient
from botocore.config import Config

from app.core.config import Settings


class R2StorageService:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings
        self._client: BaseClient | None = None

    @property
    def client(self) -> BaseClient:
        if self._client is None:
            if (
                not self.settings.r2_endpoint_url
                or not self.settings.r2_access_key_id
                or not self.settings.r2_secret_access_key
                or not self.settings.r2_bucket_name
            ):
                raise RuntimeError("R2 storage is not configured")

            self._client = boto3.client(
                "s3",
                endpoint_url=self.settings.r2_endpoint_url,
                aws_access_key_id=self.settings.r2_access_key_id,
                aws_secret_access_key=self.settings.r2_secret_access_key,
                region_name="auto",
                config=Config(signature_version="s3v4"),
            )
        return self._client

    def build_object_key(self, *, filename: str, prefix: str | None = None) -> str:
        safe_prefix = (prefix or self.settings.r2_upload_prefix).strip("/ ")
        extension = Path(filename).suffix.lower() or ".bin"
        date_path = datetime.now(timezone.utc).strftime("%Y/%m/%d")
        return f"{safe_prefix}/{date_path}/{uuid4().hex}{extension}"

    def build_public_url(self, key: str) -> str:
        if not self.settings.r2_public_base_url:
            raise RuntimeError("R2 public base URL is not configured")
        base_url = self.settings.r2_public_base_url.rstrip("/")
        return f"{base_url}/{quote(key)}"

    def upload_image(self, *, content: bytes, filename: str, content_type: str | None) -> tuple[str, str]:
        key = self.build_object_key(filename=filename)
        self.client.put_object(
            Bucket=self.settings.r2_bucket_name,
            Key=key,
            Body=content,
            ContentType=content_type or "application/octet-stream",
        )
        return key, self.build_public_url(key)
