from pydantic import BaseModel
from typing import List, Optional

class TimelineEntry(BaseModel):
    year: int
    netWorth: float

class AssetDistribution(BaseModel):
    name: str
    value: float

class Politician(BaseModel):
    name: str
    party: str
    constituency: str
    education: str
    photo: str
    totalAssets: float
    liabilities: float
    casesPending: int
    timeline: List[TimelineEntry]
    assetDistribution: List[AssetDistribution]

class AIScoreRequest(BaseModel):
    politician: Politician

class ChatRequest(BaseModel):
    query: str
    politician: Politician

class InsightsRequest(BaseModel):
    politician: Politician