from sqlalchemy import Column, Integer, String, Text, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship
from ..core.database import Base


class Document(Base):
    __tablename__ = 'documents'

    # id를 Integer 타입의 기본 키로 변경
    id = Column(Integer, primary_key=True, index=True)

    # 컬럼명을 snake_case로 변경
    title = Column(String(200), nullable=False)
    category = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    file_url = Column(String(255), nullable=True)  # fileUrl -> file_url

    created_date = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_date = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Employee 모델과 연결하기 위한 외래 키 추가
    author_id = Column(Integer, ForeignKey('employees.id'))

    # Employee 모델과의 관계 설정
    author = relationship("Employee")