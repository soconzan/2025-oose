# backend/app/services/course_service.py

from typing import List, Optional
from ..daos.course_dao import CourseDAO # CourseDAO 임포트
from ..schemas.course_schema import CourseCreate # DTO 임포트
from ..models.course_model import Course # Course ORM 모델 임포트
# from ..models.employee_model import Employee # managerId 유효성 검사 등에 필요할 수 있음

class CourseService:
    def __init__(self, course_dao: CourseDAO):
        self.course_dao = course_dao

    # 1. 교육 과정 등록 (비즈니스 로직)
    def register_course(self, course_data: CourseCreate) -> Course:
        """
        새로운 교육 과정을 등록합니다.
        필요한 비즈니스 로직을 여기에 추가할 수 있습니다 (예: 담당자 ID 유효성 검사,
        신청/교육 기간 유효성 검사 등).
        """
        # DTO -> ORM 모델 변환 (Pydantic to SQLAlchemy model)
        # currentApplicants는 기본값 0이므로 명시적으로 전달할 필요 없음
        new_course = Course(**course_data.model_dump())
        # **course_data.model_dump()는 course_data DTO의 필드들을 딕셔너리로 변환하여
        # Course ORM 모델의 생성자에 인자로 전달합니다.

        # (추가 비즈니스 로직 예시)
        # if course_data.applicationStartDate >= course_data.applicationEndDate:
        #     raise ValueError("신청 종료일은 시작일보다 빨라야 합니다.")
        # if course_data.courseStartDate >= course_data.courseEndDate:
        #     raise ValueError("교육 종료일은 시작일보다 빨라야 합니다.")
        # if course_data.applicationEndDate >= course_data.courseStartDate:
        #     raise ValueError("신청 종료일은 교육 시작일보다 빨라야 합니다.")

        # DAO를 통해 DB에 저장
        created_course = self.course_dao.create_course(new_course)
        return created_course

    # 2. 교육 과정 목록 조회 (비즈니스 로직)
    def get_course_list(self, skip: int = 0, limit: int = 100) -> List[Course]:
        """모든 교육 과정 목록을 조회합니다."""
        courses = self.course_dao.get_all_courses(skip=skip, limit=limit)
        # 필요하다면 여기에 추가적인 데이터 가공 로직을 넣을 수 있습니다.
        return courses

    # 3. 교육 과정 상세 조회 (비즈니스 로직)
    def get_course_detail(self, course_id: int) -> Optional[Course]:
        """주어진 ID에 해당하는 교육 과정 상세 정보를 조회합니다."""
        course = self.course_dao.get_course_by_id(course_id)
        # if not course:
        #     # 여기서는 FastAPI 라우터에서 HTTPException을 발생시킬 것이므로,
        #     # 서비스에서는 ORM 객체 또는 None을 반환합니다.
        #     pass
        return course