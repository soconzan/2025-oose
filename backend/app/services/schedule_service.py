from typing import List, Optional
from ..daos.schedule_dao import ScheduleDAO
from ..schemas.schedule_schema import ScheduleCreate
from ..models.schedule_model import Schedule

class ScheduleService:
    def __init__(self, schedule_dao: ScheduleDAO):
        self.schedule_dao = schedule_dao

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