from fastapi import APIRouter
from .endpoints import (
    employee_routes,
    document_routes,
    schedule_routes,
    workroom_routes,
    course_routes,
    department_routes,
    test_routes,
)

api_router = APIRouter()

# Include other routers
api_router.include_router(employee_routes.router, tags=["employees"])
api_router.include_router(document_routes.router, prefix="/documents", tags=["documents"])
api_router.include_router(schedule_routes.router, prefix="/schedules", tags=["schedules"])
api_router.include_router(workroom_routes.router, prefix="/workrooms", tags=["workrooms"])
api_router.include_router(course_routes.router, prefix="/courses", tags=["courses"])
api_router.include_router(department_routes.router, prefix="/departments", tags=["departments"])
api_router.include_router(test_routes.router, prefix="/test", tags=["test"])
