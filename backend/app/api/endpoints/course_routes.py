# backend/app/api/endpoints/course_routes.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ...core.dependencies import get_db_session # DB 세션 의존성 주입
from ...schemas.course_schema import CourseCreate, CourseResponse # DTO 임포트
from ...daos.course_dao import CourseDAO # DAO 임포트 (서비스 초기화용)
from ...services.course_service import CourseService # 서비스 임포트

router = APIRouter(prefix="/courses", tags=["교육 관리"]) # API 경로 접두사 및 태그 설정

# 의존성 주입 헬퍼 함수 (CourseService 인스턴스 생성 및 주입)
def get_course_service(db: Session = Depends(get_db_session)) -> CourseService:
    """DB 세션을 받아 CourseDAO를 초기화하고 CourseService를 반환합니다."""
    course_dao = CourseDAO(db)
    return CourseService(course_dao)

# --- API 엔드포인트 정의 ---

# 1. 교육 과정 등록 (POST)
@router.post(
    "/",
    response_model=CourseResponse, # 성공 시 반환할 DTO
    status_code=status.HTTP_201_CREATED, # 성공 시 HTTP 상태 코드
    summary="새로운 교육 과정을 등록합니다."
)
async def register_new_course(
    course_data: CourseCreate, # 클라이언트로부터 받을 요청 본문 DTO
    course_service: CourseService = Depends(get_course_service) # 서비스 의존성 주입
):
    try:
        # 서비스 계층 호출
        new_course = course_service.register_course(course_data)
        return new_course # ORM 객체가 Pydantic DTO로 자동 변환 (response_model 덕분)
    except ValueError as e:
        # 서비스 계층에서 발생한 비즈니스 로직 오류 처리
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        # 기타 예상치 못한 오류 처리
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"교육 과정 등록 중 서버 오류 발생: {e}"
        )


# 2. 교육 과정 목록 조회 (GET)
@router.get(
    "/",
    response_model=List[CourseResponse], # 목록을 반환하므로 List[DTO]
    summary="모든 교육 과정 목록을 조회합니다."
)
async def get_all_courses(
    skip: int = 0, limit: int = 100, # 페이지네이션 파라미터
    course_service: CourseService = Depends(get_course_service)
):
    courses = course_service.get_course_list(skip=skip, limit=limit)
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
    course = course_service.get_course_detail(course_id)
    if not course:
        # 교육 과정이 없을 경우 404 Not Found 반환
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"교육 과정 ID {course_id}를 찾을 수 없습니다."
        )
    return course