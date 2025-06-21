# backend/app/api/endpoints/course_routes.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional

from ...core.dependencies import get_db_session # DB 세션 의존성 주입
from ...schemas.course_schema import CourseCreate, CourseResponse # DTO 임포트
from ...daos.course_dao import CourseDAO # DAO 임포트 (서비스 초기화용)
from ...services.course_service import CourseService # 서비스 임포트

router = APIRouter(tags=["교육 관리"]) # API 경로 접두사 및 태그 설정

# 의존성 주입 헬퍼 함수 (CourseService 인스턴스 생성 및 주입)
def get_course_service(db: Session = Depends(get_db_session)) -> CourseService:
    """DB 세션을 받아 CourseService를 생성하여 반환합니다."""
    return CourseService(db_session=db)

# --- API 엔드포인트 정의 ---

# 1. 교육 과정 등록 (POST)
@router.post(
    "",
    response_model=CourseResponse, # 성공 시 반환할 DTO
    status_code=status.HTTP_201_CREATED, # 성공 시 HTTP 상태 코드
    summary="새로운 교육 과정을 등록합니다."
)
async def create_course_endpoint(
    course: CourseCreate,
    course_service: CourseService = Depends(get_course_service)
):
    """
    새로운 교육 과정을 등록합니다.
    """
    try:
        new_course = course_service.register_course(course)
        return new_course
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}"
        )

# 2. 교육 과정 목록 조회 (GET)
@router.get(
    "",
    response_model=List[CourseResponse], # 목록을 반환하므로 List[DTO]
    summary="교육 과정 목록을 조회합니다. `search` 쿼리로 제목을 검색할 수 있습니다."
)
async def get_courses_endpoint(
    search: str = "",
    skip: int = 0,
    limit: int = 10,
    course_service: CourseService = Depends(get_course_service)
):
    courses = course_service.get_courses(search=search, skip=skip, limit=limit)
    return courses

# 3. 교육 과정 상세 조회 (GET by ID)
@router.get(
    "/{course_id}", # 경로 파라미터
    response_model=CourseResponse,
    summary="특정 교육 과정의 상세 정보를 조회합니다."
)
async def get_course_detail(
    course_id: int, # 경로 파라미터는 자동으로 int로 변환됨
    course_service: CourseService = Depends(get_course_service)
):
    course = course_service.get_course_by_id(course_id=course_id)
    if course is None:
        # 교육 과정이 없을 경우 404 Not Found 반환
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found"
        )
    return course