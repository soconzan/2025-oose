from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import date

class WorkroomBase(BaseModel):
    work_title: str = Field(..., alias="workTitle")
    category: Optional[str] = None
    assignee: str
    work_content: str = Field(..., alias="workContent")
    is_public: bool = Field(..., alias="isPublic")
    start_date: date = Field(..., alias="startDate")
    end_date: date = Field(..., alias="endDate")

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True, 
    )

class WorkroomCreate(WorkroomBase):
    pass

class WorkroomUpdate(BaseModel):
    work_title: Optional[str] = Field(None, alias="workTitle")
    category: Optional[str] = None
    assignee: Optional[str] = None
    work_content: Optional[str] = Field(None, alias="workContent")
    is_public: Optional[bool] = Field(None, alias="isPublic")
    start_date: Optional[date] = Field(None, alias="startDate")
    end_date: Optional[date] = Field(None, alias="endDate")

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
