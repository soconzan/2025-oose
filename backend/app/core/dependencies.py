# backend/app/core/dependencies.py
from sqlalchemy.orm import Session
from .database import SessionLocal

def get_db_session():
    """
    FastAPI 의존성 주입을 위한 DB 세션 제너레이터.
    요청이 들어올 때 세션을 열고, 응답 후 세션을 닫습니다.
    """
    db = SessionLocal()
    try:
        yield db # 세션을 컨트롤러/서비스에 제공
    finally:
        db.close() # 요청 처리 완료 후 세션 닫기

