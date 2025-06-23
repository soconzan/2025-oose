from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.schedule_model import Schedule
import uuid
from app.schemas import schedule_schema


class ScheduleDAO:
    def __init__(self, db: Session):
        self.db = db

    def create_schedule(self, schedule: schedule_schema.ScheduleCreate) -> Schedule:
        """새로운 스케줄을 데이터베이스에 추가합니다."""
        db_schedule = Schedule(
            scheduleID=str(uuid.uuid4()),  # UUID로 scheduleID 생성
            **schedule.model_dump()
        )
        self.db.add(db_schedule)
        self.db.commit()
        self.db.refresh(db_schedule)
        return db_schedule
    
    def get_all_schedules(self, skip: int = 0, limit: int = 100) -> List[Schedule]:
        """모든 스케줄을 조회합니다."""
        return self.db.query(Schedule).offset(skip).limit(limit).all()
    
    def get_schedule_by_id(self, schedule_id: str) -> Optional[Schedule]:
        """주어진 ID에 해당하는 스케줄을 조회합니다."""
        return self.db.query(Schedule).filter(Schedule.schduleId == schedule_id).first()
    
    def update_schedule(self, schedule_id: str, updated_schedule: Schedule) -> Optional[Schedule]:
        """주어진 ID에 해당하는 스케줄을 업데이트합니다."""
        schedule = self.get_schedule_by_id(schedule_id)
        if not schedule:
            return None
        
        for key, value in updated_schedule.__dict__.items():
            if value is not None:
                setattr(schedule, key, value)
        self.db.commit()
        self.db.refresh(schedule)
        return schedule
    
    def delete_schedule(self, schedule_id: str) -> bool:
        """주어진 ID에 해당하는 스케줄을 삭제합니다."""
        schedule = self.get_schedule_by_id(schedule_id)
        if not schedule:
            return False
        
        self.db.delete(schedule)
        self.db.commit()
        return True
    
    
