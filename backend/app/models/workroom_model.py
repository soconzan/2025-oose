from sqlalchemy import Column, Integer, String, Boolean, Date
from app.core.database import Base

class Workroom(Base):
    __tablename__ = "workrooms"
    id = Column(Integer, primary_key=True, index=True)
    workTitle = Column(String(30), nullable=False)
    category = Column(String(20), nullable=True)
    assignee = Column(String(20), nullable=False)
    workContent = Column(String(200), nullable=False)
    isPublic = Column(Boolean, nullable=False, default=True)
    startDate = Column(Date, nullable=False)
    endDate = Column(Date, nullable=False)
