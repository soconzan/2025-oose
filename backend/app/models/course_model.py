# backend/app/models/course_model.py
from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship, Mapped, mapped_column
from sqlalchemy.sql import func # for default timestamps
from ..core.database import Base # SQLAlchemy Base
from .employee_model import Employee # Employee 모델 임포트 (외래 키 참조)
from datetime import datetime # 추가

class Course(Base):
    __tablename__ = "courses"

    courseId = Column(Integer, primary_key=True, index=True, autoincrement=True)
    courseName = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False)
    videoId = Column(Integer, nullable=True)
    courseStartDate = Column(DateTime, nullable=False)
    courseEndDate = Column(DateTime, nullable=False)
    applicationStartDate = Column(DateTime, nullable=False)
    applicationEndDate = Column(DateTime, nullable=False)
    courseCapacity = Column(Integer, nullable=False)
    managerId: Mapped[int] = mapped_column(ForeignKey("employees.employeeNum"), nullable=False)
    currentApplicants: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    courseTarget: Mapped[str] = mapped_column(String(255), nullable=False)
    coursePlace: Mapped[str] = mapped_column(String(255), nullable=False)

    # 관계 정의
    # manager (1:N): 한 직원은 여러 교육 과정의 담당자가 될 수 있음
    manager: Mapped[Employee] = relationship(Employee, primaryjoin=managerId == Employee.employeeNum, lazy="joined")
    # enrollments (1:N): 한 교육 과정에는 여러 수강 신청이 있을 수 있음
    enrollments: Mapped[list["Enrollment"]] = relationship("Enrollment", back_populates="course", cascade="all, delete-orphan")


class Enrollment(Base):
    __tablename__ = "enrollments"

    enrollmentId: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    courseId: Mapped[int] = mapped_column(ForeignKey("courses.courseId"), nullable=False)
    employeeId: Mapped[str] = mapped_column(ForeignKey("employees.employeeId"), nullable=False) # employeeId는 employeeId를 참조
    enrollmentDate: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=func.now()) # 현재 시간 자동 생성
    completionStatus: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False) # 기본값 False

    # 관계 정의
    # course (N:1): 한 수강 신청은 하나의 교육 과정에 속함
    course: Mapped[Course] = relationship("Course", back_populates="enrollments", lazy="joined")
    # applicant (N:1): 한 수강 신청은 한 명의 직원에게 속함
    applicant: Mapped[Employee] = relationship(Employee, primaryjoin=employeeId == Employee.employeeId, lazy="joined")