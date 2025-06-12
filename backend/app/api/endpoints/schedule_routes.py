from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ...core.dependencies import get_db_session  # DB 세션 의존성 주입
from ...schemas.schedule_schema import ScheduleCreate, ScheduleResponse  # DTO 임포트
from ...daos.schedule_dao import ScheduleDAO  # DAO 임포트 (서비스 초기화용)
from ...services.schedule_service import ScheduleService  # 서비스 임포트

router = APIRouter(prefix="/schedules", tags=["일정 관리"])  # API 경로 접두사 및 태그 설정

# 의존성 주입 헬퍼 함수 (ScheduleService 인스턴스 생성 및 주입)
def get_schedule_service(db: Session = Depends(get_db_session)) -> ScheduleService:
    """DB 세션을 받아 ScheduleDAO를 초기화하고 ScheduleService를 반환합니다."""
    schedule_dao = ScheduleDAO(db)
    return ScheduleService(schedule_dao)

# --- API 엔드포인트 정의 ---
# 1. 일정 등록 (POST)
@router.post(
    "/",
    response_model=ScheduleResponse,  # 성공 시 반환할 DTO
    status_code=status.HTTP_201_CREATED,  # 성공 시 HTTP 상태 코드
    summary="새로운 일정을 등록합니다."
)
async def register_new_schedule(
    schedule_data: ScheduleCreate,  # 클라이언트로부터 받을 요청 본문 DTO
    schedule_service: ScheduleService = Depends(get_schedule_service)  # 서비스 의존성 주입
):
    try:
        # 서비스 계층 호출
        new_schedule = schedule_service.register_schedule(schedule_data)
        return new_schedule  # ORM 객체가 Pydantic DTO로 자동 변환 (response_model 덕분)
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
            detail=f"일정 등록 중 서버 오류 발생: {e}"
        )
    
# 2. 일정 목록 조회 (GET)
@router.get(
    "/",
    response_model=List[ScheduleResponse],  # 목록을 반환하므로 List[DTO]
    summary="모든 일정 목록을 조회합니다."
)
async def get_all_schedules(
    skip: int = 0, limit: int = 100,  # 페이지네이션 파라미터
    schedule_service: ScheduleService = Depends(get_schedule_service)
):
    schedules = schedule_service.get_schedule_list(skip=skip, limit=limit)
    return schedules

# 3. 일정 상세 조회 (GET)
@router.get(
    "/{id}",
    response_model=ScheduleResponse,  # 단일 일정 반환
    summary="특정 일정의 상세 정보를 조회합니다."
)
async def get_schedule_detail(
    id: int,  # 경로 파라미터로 일정 ID
    schedule_service: ScheduleService = Depends(get_schedule_service)
):
    schedule = schedule_service.get_schedule_detail(id)
    if not schedule:
        raise HTTPException(status_code=404, detail=f"일정을 찾을 수 없습니다: {id}")
    return schedule

# 4. 일정 수정 (PUT)
@router.put(
    "/{id}",
    response_model=ScheduleResponse,  # 수정된 일정 반환
    summary="특정 일정을 수정합니다."
)
async def update_schedule(
    id: int,  # 경로 파라미터로 일정 ID
    schedule_data: ScheduleCreate,  # 수정할 일정 데이터
    schedule_service: ScheduleService = Depends(get_schedule_service)
):
    try:
        updated_schedule = schedule_service.update_schedule(id, schedule_data)
        return updated_schedule
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"일정 수정 중 서버 오류 발생: {e}"
        )
    
# 5. 일정 삭제 (DELETE)
@router.delete(
    "/{id}",
    status_code=status.HTTP_204_NO_CONTENT,  # 성공 시 No Content 반환
    summary="특정 일정을 삭제합니다."
)
async def delete_schedule(
    id: int,  # 경로 파라미터로 일정 ID
    schedule_service: ScheduleService = Depends(get_schedule_service)
):
    try:
        schedule_service.delete_schedule(id)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"일정 삭제 중 서버 오류 발생: {e}"
        )
# --- API 엔드포인트 정의 끝 ---
# Note: 이 파일은 FastAPI의 라우터로, 일정 관리 관련 API 엔드포인트를 정의합니다.
# 각 엔드포인트는 서비스 계층을 통해 비즈니스 로직을 처리하며, 예외 처리를 통해 클라이언트에게 적절한 오류 메시지를 반환합니다.