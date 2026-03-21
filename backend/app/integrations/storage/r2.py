from collections.abc import Callable
from typing import BinaryIO

import boto3
from botocore.client import BaseClient

from app.core.config import get_settings


def _build_r2_client() -> BaseClient:
    settings = get_settings()
    if not settings.r2_endpoint_url:
        raise ValueError("R2 endpoint is not configured")
    if not settings.r2_access_key_id or not settings.r2_secret_access_key:
        raise ValueError("R2 credentials are not configured")

    return boto3.client(
        "s3",
        endpoint_url=settings.r2_endpoint_url,
        aws_access_key_id=settings.r2_access_key_id,
        aws_secret_access_key=settings.r2_secret_access_key,
        region_name="auto",
    )


class R2StorageService:
    def __init__(self, client_factory: Callable[[], BaseClient] | None = None) -> None:
        self.settings = get_settings()
        self._client_factory = client_factory or _build_r2_client

    @property
    def client(self) -> BaseClient:
        return self._client_factory()

    @property
    def bucket_name(self) -> str:
        return self.settings.r2_bucket_name

    def upload_fileobj(self, *, file_obj: BinaryIO, key: str, content_type: str | None = None) -> str:
        extra_args: dict[str, str] = {}
        if content_type:
            extra_args["ContentType"] = content_type

        self.client.upload_fileobj(
            Fileobj=file_obj,
            Bucket=self.bucket_name,
            Key=key,
            ExtraArgs=extra_args or None,
        )
        return self.get_public_url(key)

    def delete_file(self, *, key: str) -> None:
        self.client.delete_object(Bucket=self.bucket_name, Key=key)

    def generate_presigned_get_url(self, *, key: str, expires_in: int = 3600) -> str:
        return self.client.generate_presigned_url(
            "get_object",
            Params={"Bucket": self.bucket_name, "Key": key},
            ExpiresIn=expires_in,
        )

    def generate_presigned_put_url(
        self,
        *,
        key: str,
        expires_in: int = 3600,
        content_type: str | None = None,
    ) -> str:
        params = {"Bucket": self.bucket_name, "Key": key}
        if content_type:
            params["ContentType"] = content_type

        return self.client.generate_presigned_url(
            "put_object",
            Params=params,
            ExpiresIn=expires_in,
        )

    def get_public_url(self, key: str) -> str:
        if self.settings.r2_public_base_url:
            return f"{self.settings.r2_public_base_url.rstrip('/')}/{key.lstrip('/')}"

        if not self.settings.r2_endpoint_url:
            raise ValueError("R2 endpoint is not configured")

        return f"{self.settings.r2_endpoint_url.rstrip('/')}/{self.bucket_name}/{key.lstrip('/')}"
