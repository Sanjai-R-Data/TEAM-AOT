import requests
from backend.config import NEWS_API_KEY

BASE_URL = "https://newsapi.org/v2/everything"

def get_disaster_news():

    keywords = "flood OR fire OR earthquake OR landslide OR cyclone OR accident"

    params = {
        "q": keywords,
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 20,
        "apiKey": NEWS_API_KEY
    }

    response = requests.get(BASE_URL, params=params)

    if response.status_code != 200:
        return []

    data = response.json()

    articles = []

    for article in data.get("articles", []):

        articles.append({
            "source": article["source"]["name"],
            "title": article["title"],
            "description": article["description"],
            "published_at": article["publishedAt"],
            "url": article["url"]
        })

    return articles