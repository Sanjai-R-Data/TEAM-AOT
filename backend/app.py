from fastapi import FastAPI

app = FastAPI(
    title="AI Disaster Response Coordinator",
    version="1.0.0"
)

@app.get("/")
def home():
    return {
        "message": "Backend is running successfully!",
        "status": "OK"
    }