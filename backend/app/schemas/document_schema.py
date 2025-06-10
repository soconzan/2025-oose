# backend/app/schemas/document_schema.py

from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime

class DocumentCreate(BaseModel):
    """
    DTO for creating a new Document.
    """
    title: str = Field(..., max_length=200, description="문서 제목")
    category: str = Field(..., max_length=100, description="문서 분류")
    content: str = Field(..., description="문서 본문 내용")
    fileUrl: Optional[str] = Field(None, description="첨부 파일 URL (선택)")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "title": "내부 보고서_2025",
                "category": "정책자료",
                "content": "2025년 상반기 정책 분석 보고서 내용...",
                "fileUrl": "https://example.com/docs/2025/report.pdf"
            }
        }
    )


class DocumentUpdate(BaseModel):
    """
    DTO for updating an existing Document.
    """
    title: Optional[str] = Field(None, max_length=200, description="문서 제목")
    category: Optional[str] = Field(None, max_length=100, description="문서 분류")
    content: Optional[str] = Field(None, description="문서 본문 내용")
    fileUrl: Optional[str] = Field(None, description="첨부 파일 URL (선택)")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "title": "내부 보고서_2025_v2",
                "content": "수정된 보고서 내용..."
            }
        }
    )


class DocumentResponse(BaseModel):
    """
    DTO for returning Document data to clients.
    """
    documentID: str = Field(..., description="문서 고유 ID")
    title: str = Field(..., description="문서 제목")
    category: str = Field(..., description="문서 분류")
    content: str = Field(..., description="문서 본문 내용")
    fileUrl: Optional[str] = Field(None, description="첨부 파일 URL")
    createdDate: datetime = Field(..., description="등록 일시")
    updatedDate: datetime = Field(..., description="수정 일시")

    model_config = ConfigDict(from_attributes=True)
