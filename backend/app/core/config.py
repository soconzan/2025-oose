# backend/app/core/config.py
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DB_HOST: str = "eastsparkle.kro.kr"
    DB_PORT: int = 3306
    DB_USER: str = "kms_admin"
    DB_PASSWORD: str = "4444"  # MySQL의 root 비밀번호를 여기에 입력하세요
    DB_NAME: str = "KMS_DB"

    API_HOST: str = "localhost"
    API_PORT: int = 8000

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()

