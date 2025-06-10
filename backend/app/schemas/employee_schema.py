from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Literal

# Employee DTO

class EmployeeCreate(BaseModel):
    employeeId: str = Field(..., min_length=1, max_length=32, description="직원 ID")
    employeeNum: int = Field(..., ge=1, description="사번")
    name: str = Field(..., min_length=1, max_length=10, description="이름")
    email: EmailStr = Field(..., max_length=32, description="이메일 (honggildong@moef.go.kr)")
    phone: str = Field(..., min_length=9, max_length=20, description="연락처 (예: 010-1234-5678)")
    departmentId: int = Field(..., ge=1, description="부서 ID")
    position: str = Field(..., min_length=1, max_length=20, description="직책 (예: 국장, 사무관 등)")
    userType: Literal["ADMIN", "USER"] = Field(..., description='유저 타입: "ADMIN" 또는 "USER"')

    # class Config:
    #     orm_mode = True


class EmployeeResponse(BaseModel):
    employeeId: str = Field(..., description="직원 고유 ID")
    employeeNum: int = Field(..., description="사번")
    name: str = Field(..., description="이름")
    email: EmailStr = Field(..., description="이메일")
    phone: str = Field(..., description="연락처")
    departmentId: int = Field(..., description="부서 ID")
    position: str = Field(..., description="직책")
    userType: Literal["ADMIN", "USER"] = Field(..., description='유저 타입: "ADMIN" 또는 "USER"')

    # class Config:
    #     orm_mode = True
    model_config = ConfigDict(from_attribute=True)
