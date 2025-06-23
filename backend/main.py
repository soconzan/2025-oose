import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))  # 가장 먼저 추가!

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.routing import APIRoute
from app.api.main_router import api_router
from app.core.database import Base, engine  # ORM 모델을 위한 Base, engine
from fastapi.middleware.cors import CORSMiddleware

# .env 파일 로드
load_dotenv(dotenv_path=".env")

# 환경변수 불러오기
api_host = os.getenv("API_HOST")
api_port = os.getenv("API_PORT")

app = FastAPI(title="기획재정부 관리 시스템 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 개발 서버 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")

# DB 테이블 생성 (개발 단계에서만 사용)
# 실제 운영 환경에서는 마이그레이션 툴 (Alembic) 사용 권장
@app.on_event("startup")
def on_startup():
    # 데이터베이스 테이블 생성
    Base.metadata.create_all(bind=engine)
    
    # 등록된 라우트 출력 (개발용)
    print("--- Registered Routes ---")
    for route in app.routes:
        if isinstance(route, APIRoute):
            print(f"Path: {route.path}, Name: {route.name}, Methods: {route.methods}")
    print("-------------------------")

# uvicorn main:app --reload 로 실행
def on_startup():
    Base.metadata.create_all(bind=engine)


@app.get("/")
def root():
    return {"message": "FastAPI backend running"}
