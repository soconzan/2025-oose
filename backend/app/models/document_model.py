# backend/app/models/document_model.py

import uuid
from sqlalchemy import Column, String, Text, DateTime, func
from ..core.database import Base

class Document(Base):
    __tablename__ = 'documents'

    documentID = Column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        unique=True,
        index=True,
        comment="문서 고유 ID (UUID)"
    )
    title = Column(
        String(200),
        nullable=False,
        comment="문서 제목"
    )
    category = Column(
        String(100),
        nullable=False,
        comment="문서 분류"
    )
    content = Column(
        Text,
        nullable=False,
        comment="문서 본문 내용"
    )
    fileUrl = Column(
        String(255),
        nullable=True,
        comment="첨부 파일 URL"
    )
    createdDate = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
        comment="등록 일시"
    )
    updatedDate = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
        comment="수정 일시"
    )
