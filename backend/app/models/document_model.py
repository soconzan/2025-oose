from sqlalchemy import Column, Integer, String, Text, DateTime, func, ForeignKey
from sqlalchemy.orm import relationship
from ..core.database import Base
import datetime

class Document(Base):
    __tablename__ = 'documents'

    documentID = Column(String(50), primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    content = Column(Text, nullable=True)
    filePath = Column(String(255), nullable=True)

    createdDate = Column(DateTime, server_default=func.now(), nullable=False)
    updatedDate = Column(DateTime, nullable=True)

    authorEmployeeId = Column(String(50), ForeignKey('employees.employeeId'))
    author = relationship("Employee", back_populates="documents")