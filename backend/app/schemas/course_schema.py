# backend/app/schemas/course_schema.py

from pydantic import BaseModel, ConfigDict, Field # Pydantic v2
from typing import Optional # Python의 Type Hinting (선택적 필드)
from datetime import datetime, date # 날짜/시간 타입 (ISO 8601 형식 문자열로 주고받음)

# --- Course (교육 과정) DTOs ---

# 1. Course 생성 요청 DTO (클라이언트 -> 백엔드 POST /courses/ 요청 시 본문)
#    - 관리자가 새로운 교육 과정을 시스템에 등록할 때 필요한 입력 필드를 정의합니다.
#    - 모든 필드는 필수(required)입니다.
class CourseCreate(BaseModel):
    courseName: str = Field(..., max_length=255, description="교육 과정명")
    category: str = Field(..., max_length=100, description="교육 분류 (예: 필수교육, 전문교육)")
    videoId: Optional[int] = Field(None, description="관련 영상 ID (선택 사항, 영상이 없는 경우 None)")
    managerId: int = Field(..., description="교육 담당 직원의 고유 번호 (employees.employeeNum을 참조합니다)")
    courseStartDate: datetime = Field(..., description="교육 시작 일시 (예: '2025-07-20T09:00:00')")
    courseEndDate: datetime = Field(..., description="교육 종료 일시")
    applicationStartDate: datetime = Field(..., description="수강 신청 시작 일시")
    applicationEndDate: datetime = Field(..., description="수강 신청 종료 일시")
    courseCapacity: int = Field(..., gt=0, description="교육 정원 (0보다 커야 합니다)")
    courseTarget: str = Field(..., max_length=255, description="교육 대상 (예: '신입 주무관', '정책 실무자')")
    coursePlace: str = Field(..., max_length=255, description="교육 장소")

    # FastAPI의 자동 문서화(Swagger UI)에서 예시로 보여줄 데이터를 설정합니다.
    # 클라이언트 개발자가 API 사용법을 이해하는 데 도움이 됩니다.
    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "courseName": "기획재정부 재정 분석 실무",
                "category": "전문교육",
                "videoId": 3001,
                "managerId": 10001, # 예시: 백엔드 DB에 존재하는 직원 번호 (employees.employeeNum)
                "courseStartDate": "2025-08-01T09:00:00",
                "courseEndDate": "2025-08-05T18:00:00",
                "applicationStartDate": "2025-07-10T09:00:00",
                "applicationEndDate": "2025-07-25T18:00:00",
                "courseCapacity": 30,
                "courseTarget": "재정관리국 직원",
                "coursePlace": "정부세종청사 대강의실"
            }
        }
    )


# 2. Course 업데이트 요청 DTO (클라이언트 -> 백엔드 PUT/PATCH /courses/{course_id} 요청 시 본문)
#    - 기존 교육 과정의 정보를 수정할 때 사용되는 입력 필드를 정의합니다.
#    - 모든 필드는 Optional로 선언하여, 클라이언트가 변경하고자 하는 필드만 보낼 수 있도록 합니다.
class CourseUpdate(BaseModel):
    courseName: Optional[str] = Field(None, max_length=255, description="교육 과정명")
    category: Optional[str] = Field(None, max_length=100, description="교육 분류")
    videoId: Optional[int] = Field(None, description="관련 영상 ID")
    managerId: Optional[int] = Field(None, description="교육 담당 직원 번호")
    courseStartDate: Optional[datetime] = Field(None, description="교육 시작 일시")
    courseEndDate: Optional[datetime] = Field(None, description="교육 종료 일시")
    applicationStartDate: Optional[datetime] = Field(None, description="수강 신청 시작 일시")
    applicationEndDate: Optional[datetime] = Field(None, description="수강 신청 종료 일시")
    courseCapacity: Optional[int] = Field(None, gt=0, description="교육 정원")
    # 'currentApplicants' 필드는 클라이언트가 직접 수정하기보다는
    # 수강 신청/취소 로직에 의해 백엔드에서 자동으로 업데이트되는 것이 일반적입니다.
    # 만약 관리자 화면에서 수동으로 수정할 필요가 있다면 포함시킬 수 있습니다.
    currentApplicants: Optional[int] = Field(None, ge=0, description="현재 신청자 수 (0 이상)")
    courseTarget: Optional[str] = Field(None, max_length=255, description="교육 대상")
    coursePlace: Optional[str] = Field(None, max_length=255, description="교육 장소")

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "courseCapacity": 35,
                "coursePlace": "세종컨벤션센터"
            }
        }
    )


# 3. Course 응답 DTO (백엔드 -> 클라이언트 GET/POST/PUT/DELETE 응답)
#    - 백엔드가 클라이언트에게 교육 과정 데이터를 반환할 때의 형태를 정의합니다.
#    - DB 모델(`backend/app/models/course_model.py`의 Course 클래스)의 모든 필드를 포함하며,
#      SQLAlchemy ORM 객체에서 이 Pydantic DTO로 자동 변환될 수 있도록 `from_attributes=True`를 설정합니다.
class CourseResponse(BaseModel):
    courseId: int = Field(..., description="교육 과정 고유 ID")
    courseName: str
    category: str
    videoId: Optional[int]
    managerId: int
    courseStartDate: datetime
    courseEndDate: datetime
    applicationStartDate: datetime
    applicationEndDate: datetime
    courseCapacity: int
    currentApplicants: int # 현재 신청자 수는 조회 시 포함되어야 함
    courseTarget: str
    coursePlace: str

    # Pydantic v2에서 SQLAlchemy ORM 객체를 Pydantic DTO로 자동 변환하기 위해 필요
    model_config = ConfigDict(from_attributes=True)