# backend/app/core/database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import settings

# 데이터베이스 URL 구성
# MySQL Connector/Python은 mysql+mysqlconnector 드라이버를 사용합니다.

DATABASE_URL = (
    f"mysql+pymysql://{settings.DB_USER}:{settings.DB_PASSWORD}"
    f"@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"
)

# SQLAlchemy 엔진 생성
# pool_pre_ping=True: 연결 풀에서 연결을 사용하기 전에 유효성 검사 (끊긴 연결 방지)
engine = create_engine(DATABASE_URL, pool_pre_ping=True)

# 데이터베이스 세션 생성
# autocommit=False: 트랜잭션이 자동으로 커밋되지 않도록 (수동 커밋 필요)
# autoflush=False: 변경 사항이 자동으로 DB에 플러시되지 않도록
# bind=engine: 생성된 엔진에 세션을 바인딩
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ORM 모델을 위한 기본 클래스 (데이터베이스 테이블과 매핑)
Base = declarative_base()

# DB 테이블 생성 함수 (개발 단계에서 사용, 마이그레이션 툴 사용 전까지)
def create_db_tables():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created (if not already existing).")

