from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import politicians, ai

app = FastAPI(title="PolityWatch AI API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(politicians.router, prefix="/api", tags=["politicians"])
app.include_router(ai.router, prefix="/api", tags=["ai"])

@app.get("/")
def root():
    return {"message": "PolityWatch AI API", "status": "running"}

@app.get("/health")
def health():
    return {"status": "healthy"}