from fastapi import FastAPI
from app.api.main_router import api_router
# from app.core.database import Base, engine # ORM 모델을 위한 Base, engine
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="기획재정부 관리 시스템 API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React 개발 서버 주소
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

# DB 테이블 생성 (개발 단계에서만 사용)
# 실제 운영 환경에서는 마이그레이션 툴 (Alembic) 사용 권장
# @app.on_event("startup")
# def on_startup():
#     Base.metadata.create_all(bind=engine)

# uvicorn main:app --reload 로 실행

@app.get("/")
def root():
    return {"message" : "FastAPI backend running"}