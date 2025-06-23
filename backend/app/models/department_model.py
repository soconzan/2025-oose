from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from ..core.database import Base

class Department(Base):
    __tablename__ = "departments"

    departmentId = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), unique=True, nullable=False, index=True)
    description = Column(String(255), nullable=True)

    employees = relationship("Employee", back_populates="department") 