from fastapi import FastAPI
from app.api.main_router import api_router
from app.core.database import engine, Base

# 데이터베이스 테이블 생성
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="2025 OOSE-Team B",
    description="객체지향 소프트웨어 공학 B팀 프로젝트 API 문서",
    version="1.0.0",
)

# API 라우터 포함
app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to 2025 OOSE-Team B API"} 