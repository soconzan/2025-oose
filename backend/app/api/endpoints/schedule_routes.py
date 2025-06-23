from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ...core.dependencies import get_db  # DB 세션 의존성 주입
from ...schemas.schedule_schema import ScheduleCreate, ScheduleResponse, ScheduleUpdate  # DTO 임포트
from ...services.schedule_service import ScheduleService  # 서비스 임포트

router = APIRouter(tags=["일정 관리"])  # API 경로 접두사 및 태그 설정

# --- API 엔드포인트 정의 ---
# 1. 일정 등록 (POST)
@router.post(
    "/",
    response_model=ScheduleResponse,  # 성공 시 반환할 DTO
    status_code=status.HTTP_201_CREATED,  # 성공 시 HTTP 상태 코드
    summary="새로운 일정을 등록합니다."
)
async def create_schedule(
    schedule_in: ScheduleCreate,
    db: Session = Depends(get_db)
):
    """
    새로운 스케줄 생성
    """
    schedule_service = ScheduleService(db)
    created_schedule = schedule_service.create_new_schedule(schedule_in)
    return created_schedule

# 2. 일정 목록 조회 (GET)
@router.get(
    "/",
    response_model=List[ScheduleResponse],  # 목록을 반환하므로 List[DTO]
    summary="모든 일정 목록을 조회합니다."
)
async def read_schedules(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    스케줄 목록 조회
    """
    schedule_service = ScheduleService(db)
    schedules = schedule_service.get_all_schedules(skip=skip, limit=limit)
    return schedules

# 3. 일정 상세 조회 (GET)
@router.get(
    "/{schedule_id}",
    response_model=ScheduleResponse,  # 단일 일정 반환
    summary="특정 일정의 상세 정보를 조회합니다."
)
async def read_schedule(
    schedule_id: str,
    db: Session = Depends(get_db)
):
    schedule_service = ScheduleService(db)
    db_schedule = schedule_service.get_schedule_by_id(schedule_id=schedule_id)
    if db_schedule is None:
        raise HTTPException(status_code=404, detail="Schedule not found")
    return db_schedule

# 4. 일정 수정 (PUT)
@router.put(
    "/{schedule_id}",
    response_model=ScheduleResponse,  # 수정된 일정 반환
    summary="특정 일정을 수정합니다."
)
async def update_schedule(
    schedule_id: str,
    schedule_in: ScheduleUpdate,
    db: Session = Depends(get_db)
):
    schedule_service = ScheduleService(db)
    updated_schedule = schedule_service.update_existing_schedule(schedule_id, schedule_in)
    if updated_schedule is None:
        raise HTTPException(status_code=404, detail="Schedule not found")
    return updated_schedule

# 5. 일정 삭제 (DELETE)
@router.delete(
    "/{schedule_id}",
    status_code=status.HTTP_204_NO_CONTENT,  # 성공 시 No Content 반환
    summary="특정 일정을 삭제합니다."
)
async def delete_schedule(
    schedule_id: str,
    db: Session = Depends(get_db)
):
    schedule_service = ScheduleService(db)
    deleted = schedule_service.delete_schedule_by_id(schedule_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Schedule not found")
    return {"ok": True}
# --- API 엔드포인트 정의 끝 ---
# Note: 이 파일은 FastAPI의 라우터로, 일정 관리 관련 API 엔드포인트를 정의합니다.
# 각 엔드포인트는 서비스 계층을 통해 비즈니스 로직을 처리하며, 예외 처리를 통해 클라이언트에게 적절한 오류 메시지를 반환합니다.