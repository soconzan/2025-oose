# backend/app/schemas/document_schema.py

from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime
from .employee_schema import EmployeeResponse  # 작성자 정보를 위해 추가


# --- DocumentCreate ---
class DocumentCreate(BaseModel):
    title: str = Field(..., max_length=200)
    category: str = Field(..., max_length=100)
    content: str = Field(...)
    file_url: Optional[str] = Field(None)
    author_id: int = Field(..., description="작성자 사원 ID")  # 작성자 ID 필드 추가


# --- DocumentUpdate ---
class DocumentUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=200)
    category: Optional[str] = Field(None, max_length=100)
    content: Optional[str] = Field(None)
    file_url: Optional[str] = Field(None)


# --- DocumentResponse ---
class DocumentResponse(BaseModel):
    id: int
    title: str
    category: str
    content: str
    file_url: Optional[str] = None
    created_date: datetime
    updated_date: datetime

    # author 필드에 EmployeeResponse 스키마를 사용하여 작성자 정보를 포함
    author: Optional[EmployeeResponse] = None

    # Pydantic v2 스타일로 orm_mode 설정
    model_config = ConfigDict(from_attributes=True)