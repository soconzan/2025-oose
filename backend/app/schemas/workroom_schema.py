from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import date

class WorkroomBase(BaseModel):
    workTitle: str = Field(..., alias="workTitle")
    category: Optional[str] = None
    assignee: str
    assigneeNum: int = Field(..., description="담당자 직원번호")
    workContent: str = Field(..., alias="workContent")
    isPublic: bool = Field(..., alias="isPublic")
    startDate: date = Field(..., alias="startDate")
    endDate: date = Field(..., alias="endDate")

    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True, 
    )

class WorkroomCreate(WorkroomBase):
    pass

class WorkroomUpdate(BaseModel):
    workTitle: Optional[str] = Field(None, alias="workTitle")
    category: Optional[str] = None
    assignee: Optional[str] = None
    assigneeNum: Optional[int] = Field(None, description="담당자 직원번호")
    workContent: Optional[str] = Field(None, alias="workContent")
    isPublic: Optional[bool] = Field(None, alias="isPublic")
    startDate: Optional[date] = Field(None, alias="startDate")
    endDate: Optional[date] = Field(None, alias="endDate")

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
