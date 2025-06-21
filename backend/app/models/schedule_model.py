from sqlalchemy import String, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func # for default timestamps
from ..core.database import Base # SQLAlchemy Base
from datetime import datetime

class Schedule(Base):
    __tablename__ = "schdules"

    schduleId : Mapped[str]= mapped_column(String(40), primary_key=True, index=True)
    startDate : Mapped[datetime]= mapped_column(DateTime, nullable=False)
    endDate : Mapped[datetime] = mapped_column(DateTime, nullable=False)
    description : Mapped[str] = mapped_column(String(256), nullable=True)
    sharingScope : Mapped[int] = mapped_column(Integer, nullable=False)
    smsAlertTime : Mapped[datetime] = mapped_column(DateTime, nullable=True)
    smsAlertTarget : Mapped[int] = mapped_column(Integer, nullable=True)