# apps/ml-service/main.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Travel ML Service")

class RecRequest(BaseModel):
    user_id: int | None = None
    top_k: int = 5

class RecResponse(BaseModel):
    recommendations: List[int]  # destination ids

@app.get("/health")
def health():
    return {"ok": True, "service": "ml"}

@app.post("/recommend", response_model=RecResponse)
def recommend(req: RecRequest):
    # TODO: replace stub with real model logic (collaborative filtering / embeddings)
    # For now return top-K deterministic ids (1..top_k)
    return RecResponse(recommendations=list(range(1, req.top_k + 1)))
