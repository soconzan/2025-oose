from pydantic import BaseModel, ConfigDict, Field # Pydantic v2
from typing import Optional # Python의 Type Hinting (선택적 필드)
from datetime import datetime # 날짜/시간 타입 (ISO 8601 형식 문자열로 주고받음)

class ScheduleCreate(BaseModel):
    scheduleId: str = Field(..., max_length=255, description="스케줄 ID")
    description: str = Field(..., max_length=100, description="스케줄 내용")
    startDate: datetime = Field(..., description="시작 일시 (예: '2025-07-20T09:00:00')")
    endDate: datetime = Field(..., description="종료 일시")
    sharingScope: int = Field(..., description="공유 범위 (예: 0 - 비공개, 1 - 부서 내 공유, 2 - 전체 공유)")
    smsAlertTime: Optional[datetime] = Field(None, description="SMS 알림 시간 (선택 사항)")
    smsAlertTarget: Optional[int] = Field(None, description="SMS 알림 대상 (선택 사항, 0 - 부서 내, 1 - 전체)")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "scheduleId": "schd-001",
                "description": "기획재정부 재정 분석 실무 교육",
                "startDate": "2025-08-01T09:00:00",
                "endDate": "2025-08-05T18:00:00",
                "sharingScope": 1,  # 부서 내 공유
                "smsAlertTime": "2025-07-30T10:00:00",  # SMS 알림 시간 (선택 사항)
                "smsAlertTarget": 0  # 부서 내 알림 대상
            }
        }
    )

class ScheduleUpdate(BaseModel):
    scheduleId: Optional[str] = Field(None, max_length=255, description="스케줄 ID")
    description: Optional[str] = Field(None, max_length=100, description="스케줄 내용")
    startDate: Optional[datetime] = Field(None, description="시작 일시")
    endDate: Optional[datetime] = Field(None, description="종료 일시")
    sharingScope: Optional[int] = Field(None, description="공유 범위")
    smsAlertTime: Optional[datetime] = Field(None, description="SMS 알림 시간 (선택 사항)")
    smsAlertTarget: Optional[int] = Field(None, description="SMS 알림 대상 (선택 사항)")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "scheduleId": "schd-001",
                "description": "기획재정부 재정 분석 실무 교육 - 업데이트",
                "startDate": "2025-08-01T09:00:00",
                "endDate": "2025-08-05T18:00:00",
                "sharingScope": 1,
                "smsAlertTime": "2025-07-30T10:00:00",
                "smsAlertTarget": 0
            }
        }
    )

class ScheduleResponse(BaseModel):
    scheduleId: str = Field(..., max_length=255, description="스케줄 ID")
    description: str = Field(..., max_length=100, description="스케줄 내용")
    startDate: datetime = Field(..., description="시작 일시 (예: '2025-07-20T09:00:00')")
    endDate: datetime = Field(..., description="종료 일시")
    sharingScope: int = Field(..., description="공유 범위 (예: 0 - 비공개, 1 - 부서 내 공유, 2 - 전체 공유)")
    smsAlertTime: Optional[datetime] = Field(None, description="SMS 알림 시간 (선택 사항)")
    smsAlertTarget: Optional[int] = Field(None, description="SMS 알림 대상 (선택 사항)")

    model_config = ConfigDict(from_attributes=True)
