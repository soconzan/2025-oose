from sqlalchemy import Column, String, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship
from ..core.database import Base
import enum

class UserTypeEnum(str, enum.Enum):
    ADMIN = "ADMIN"
    USER = "USER"


class Employee(Base):
    __tablename__ = "employees"

    employeeId = Column(String(50), primary_key=True, index=True)
    employeeNum = Column(Integer, unique=True, nullable=False, index=True)
    password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone = Column(String(20), nullable=False)
    departmentId = Column(Integer, ForeignKey("departments.departmentId"), nullable=False)
    position = Column(String(100), nullable=False)
    userType = Column(Enum(UserTypeEnum), nullable=False)

    # 문서와의 관계
    documents = relationship("Document", back_populates="author", foreign_keys="Document.authorEmployeeId")

    # 관계 설정 (부서 테이블과 연결)
    # department = relationship("Department", back_populates="employees")
