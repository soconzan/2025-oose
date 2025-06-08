from sqlalchemy import Column, Integer, String
from ..core.database import Base

class Workroom(Base):
    __tablename__ = "workrooms"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
