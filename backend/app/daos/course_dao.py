# backend/app/daos/course_dao.py

from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.course_model import Course # Course ORM 모델 임포트
from ..schemas.course_schema import CourseCreate, CourseUpdate # DTO 임포트 (타입 힌트용)

class CourseDAO:
    def __init__(self, db: Session):
        self.db = db

    # 1. 교육 과정 등록 (Create)
    def create_course(self, course: Course) -> Course:
        """새로운 교육 과정을 데이터베이스에 추가합니다."""
        self.db.add(course)
        self.db.commit()
        self.db.refresh(course) # DB에서 생성된 courseId 등 업데이트된 값을 객체에 반영
        return course

    # 2. 교육 과정 목록 조회 (Read - All)
    def get_all_courses(self, skip: int = 0, limit: int = 100) -> List[Course]:
        """모든 교육 과정을 조회합니다."""
        return self.db.query(Course).offset(skip).limit(limit).all()

    # 3. 교육 과정 상세 조회 (Read - By ID)
    def get_course_by_id(self, course_id: int) -> Optional[Course]:
        """주어진 ID에 해당하는 교육 과정을 조회합니다."""
        return self.db.query(Course).filter(Course.courseId == course_id).first()