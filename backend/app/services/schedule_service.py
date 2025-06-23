from typing import List, Optional
from sqlalchemy.orm import Session
from ..daos.schedule_dao import ScheduleDAO
from ..schemas.schedule_schema import ScheduleCreate, ScheduleUpdate
from ..models.schedule_model import Schedule

class ScheduleService:
    def __init__(self, db: Session):
        self.schedule_dao = ScheduleDAO(db)

    # 1. 일정 등록
    def register_schedule(self, schedule_data: ScheduleCreate) -> Schedule:
        new_schedule = Schedule(**schedule_data.model_dump())
        created_schedule = self.schedule_dao.create_schedule(new_schedule)
        return created_schedule

    # 2. 일정 목록 조회
    def get_schedule_list(self, skip: int = 0, limit: int = 100) -> List[Schedule]:
        schedules = self.schedule_dao.get_all_schedules(skip=skip, limit=limit)
        return schedules

    # 3. 일정 상세 조회
    def get_schedule_detail(self, schedule_id: int) -> Optional[Schedule]:
        schedule = self.schedule_dao.get_schedule_by_id(schedule_id)
        return schedule

    def create_new_schedule(self, schedule_data: ScheduleCreate):
        """
        새로운 스케줄을 생성하는 서비스
        """
        return self.schedule_dao.create_schedule(schedule_data)

    def get_schedule_by_id(self, schedule_id: str):
        return self.schedule_dao.get_schedule_by_id(schedule_id)

    def get_all_schedules(self, skip: int = 0, limit: int = 100):
        return self.schedule_dao.get_all_schedules(skip, limit)
    
    def update_existing_schedule(self, schedule_id: str, schedule_data: ScheduleUpdate):
        return self.schedule_dao.update_schedule(schedule_id, schedule_data)

    def delete_schedule_by_id(self, schedule_id: str):
        return self.schedule_dao.delete_schedule(schedule_id)