from fastapi import APIRouter

from backend.services.news_service import get_disaster_news

router = APIRouter()


@router.get("/news")
def get_news():
    return get_disaster_news()