from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import auth, papers
import os

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ResearchHub AI API",
    description="Intelligent Research Paper Management and Analysis System",
    version="1.0.0"
)

# CORS (allow all for now)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(papers.router)

@app.get("/")
async def root():
    return {
        "status": "online",
        "message": "ResearchHub AI API is running",
        "version": "1.0.0",
        "agent": "Llama 3.3 70B Active"
    }

# Render compatible run
if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 10000))
    uvicorn.run(app, host="0.0.0.0", port=port)