from fastapi import APIRouter
from app.api.endpoints import employee_routes
from app.api.endpoints import document_routes
# from app.api.endpoints import (
#     employee_routes,
#     schedule_routes,
#     document_routes,
#     work_routes,
#     course_routes,
# )

api_router = APIRouter()

api_router.include_router(employee_routes.router, tags=["Employees"])
api_router.include_router(document_routes.router, prefix="/documents", tags=["documents"])
