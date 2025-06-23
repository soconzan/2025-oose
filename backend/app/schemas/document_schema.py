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
    filePath: Optional[str] = Field(None)
    authorEmployeeId: str = Field(..., description="작성자 사원 ID")


# --- DocumentUpdate ---
class DocumentUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=200)
    category: Optional[str] = Field(None, max_length=100)
    content: Optional[str] = Field(None)
    filePath: Optional[str] = Field(None)


# --- DocumentResponse ---
class DocumentResponse(BaseModel):
    documentID: str
    title: str
    category: str
    content: str
    filePath: Optional[str] = None
    createdDate: datetime
    updatedDate: Optional[datetime] = None
    authorEmployeeId: Optional[str] = None
    author: Optional[EmployeeResponse] = None
    model_config = ConfigDict(from_attributes=True)