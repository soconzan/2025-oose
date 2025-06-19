# backend/app/core/config.py
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str

    API_HOST: str
    API_PORT: int

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
