from fastapi import FastAPI

from backend.routes.news_routes import router as news_router
from backend.routes.report_routes import router as report_router
from backend.routes.dashboard_routes import router as dashboard_router
from backend.routes.resource_routes import router as resource_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Disaster Response Coordinator",
    version="1.0.0"
)

app.include_router(news_router)
app.include_router(report_router)
app.include_router(dashboard_router)
app.include_router(resource_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}