from pydantic import BaseModel, Field

# Base schema for a department
class DepartmentBase(BaseModel):
    name: str = Field(..., max_length=100, description="부서명")
    description: str | None = Field(None, max_length=255, description="부서 설명")

# Schema for creating a new department
class DepartmentCreate(DepartmentBase):
    pass

# Schema for reading/returning a department
class Department(DepartmentBase):
    departmentId: int = Field(..., description="부서 ID")

    class Config:
        from_attributes = True 