from fastapi import APIRouter
from app.api.endpoints.employee_routes import router as employee_routes_router
from app.api.endpoints.document_routes import router as document_routes_router
from app.api.endpoints.test_routes import router as test_routes_router
from app.api.endpoints.schedule_routes import router as schedule_routes_router
from app.api.endpoints.workroom_routes import router as workroom_routes_router
from app.api.endpoints.course_routes import router as course_routes_router

api_router = APIRouter()

# 라우터 등록
api_router.include_router(employee_routes_router, prefix="/employees", tags=["employees"])
api_router.include_router(document_routes_router, prefix="/documents", tags=["documents"])
api_router.include_router(test_routes_router, prefix="/test", tags=["test"])
api_router.include_router(schedule_routes_router, prefix="/schedules", tags=["schedules"])
api_router.include_router(workroom_routes_router, prefix="/workrooms", tags=["workrooms"])
api_router.include_router(course_routes_router, prefix="/courses", tags=["courses"])
