from fastapi import APIRouter
import json

router = APIRouter()

@router.get("/politicians")
def get_politicians():
    # In production, load from database
    with open("app/data/politicians.json", "r") as f:
        data = json.load(f)
    return data

@router.get("/politicians/{name}")
def get_politician(name: str):
    with open("app/data/politicians.json", "r") as f:
        data = json.load(f)
    politician = next((p for p in data if p["name"] == name), None)
    if not politician:
        return {"error": "Politician not found"}
    return politician