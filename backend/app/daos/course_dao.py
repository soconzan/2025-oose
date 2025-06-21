# backend/app/daos/course_dao.py

from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import List, Optional
from ..models.course_model import Course # Course ORM 모델 임포트
from ..schemas.course_schema import CourseCreate, CourseUpdate # DTO 임포트 (타입 힌트용)

class CourseDAO:
    def __init__(self, db_session: Session):
        self.db = db_session

    # 1. 교육 과정 등록 (Create)
    def create(self, course_data: CourseCreate) -> Course:
        """새로운 교육 과정을 데이터베이스에 추가합니다."""
        new_course = Course(**course_data.model_dump())
        self.db.add(new_course)
        self.db.commit()
        self.db.refresh(new_course)
        return new_course

    # 2. 교육 과정 목록 조회 (Read - All)
    def get_all(self, search: str, skip: int, limit: int) -> List[Course]:
        """모든 교육 과정을 조회합니다."""
        query = select(Course)
        if search:
            query = query.filter(Course.courseName.ilike(f"%{search}%"))
        query = query.offset(skip).limit(limit)
        result = self.db.execute(query)
        return result.scalars().all()

    # 3. 교육 과정 상세 조회 (Read - By ID)
    def get_course_by_id(self, course_id: int) -> Optional[Course]:
        """주어진 ID에 해당하는 교육 과정을 조회합니다."""
        return self.db.query(Course).filter(Course.courseId == course_id).first()