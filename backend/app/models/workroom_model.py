from sqlalchemy import Column, Integer, String, Boolean, Date
from app.core.database import Base

class Workroom(Base):
    __tablename__ = "workrooms"
    id = Column(Integer, primary_key=True, index=True)
    work_title = Column(String(30), nullable=False)
    category = Column(String(20), nullable=True)
    assignee = Column(String(20), nullable=False)
    work_content = Column(String(200), nullable=False)
    is_public = Column(Boolean, nullable=False, default=True)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
