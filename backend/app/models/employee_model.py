from sqlalchemy import Column, String, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class UserTypeEnum(str, enum.Enum):
    ADMIN = "ADMIN"
    USER = "USER"


class Employee(Base):
    __tablename__ = "employees"

    employeeId = Column(String(20), primary_key=True, index=True)
    employeeNum = Column(Integer, unique=True, nullable=False, index=True)
    password = Column(String(256), nullable=False)
    name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    phone = Column(String(20), nullable=False)
    # departmentId = Column(Integer, ForeignKey("departments.departmentId"), nullable=False)
    departmentId = Column(Integer, nullable=True)
    position = Column(String(20), nullable=False)
    userType = Column(Enum(UserTypeEnum), nullable=False)

    # 관계 설정 (부서 테이블과 연결)
    # department = relationship("Department", back_populates="employees")