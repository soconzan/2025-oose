from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import date

class WorkroomBase(BaseModel):
    work_title: str = Field(..., alias="work_title")
    category: Optional[str] = None
    assignee: str
    work_content: str = Field(..., alias="work_content")
    is_public: bool = Field(..., alias="is_public")
    start_date: date = Field(..., alias="start_date")
    end_date: date = Field(..., alias="end_date")

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True, 
    )

class WorkroomCreate(WorkroomBase):
    pass

class WorkroomUpdate(BaseModel):
    work_title: Optional[str] = Field(None, alias="work_title")
    category: Optional[str] = None
    assignee: Optional[str] = None
    work_content: Optional[str] = Field(None, alias="work_content")
    is_public: Optional[bool] = Field(None, alias="is_public")
    start_date: Optional[date] = Field(None, alias="start_date")
    end_date: Optional[date] = Field(None, alias="end_date")

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
    )

class WorkroomOut(WorkroomBase):
    id: int

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
    )
