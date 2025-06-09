from sqlalchemy import Column, String, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship, Mapped, mapped_column
from ..core.database import Base
import enum

class UserTypeEnum(str, enum.Enum):
    ADMIN = "ADMIN"
    USER = "USER"


class Employee(Base):
    __tablename__ = "employees"

    employeeId: Mapped[str] = mapped_column(String(20),  primary_key=True, index=True)
    employeeNum: Mapped[int] = mapped_column(Integer,       unique=True, nullable=False, index=True)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    name: Mapped[str] = mapped_column(String(50),  nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    phone: Mapped[str] = mapped_column(String(20),  nullable=False)
    departmentId: Mapped[int | None] = mapped_column(Integer, nullable=True)
    position: Mapped[str] = mapped_column(String(20),  nullable=False)
    userType: Mapped[UserTypeEnum] = mapped_column(Enum(UserTypeEnum), nullable=False)

    # 관계 설정 (부서 테이블과 연결)
    # department = relationship("Department", back_populates="employees")
