from fastapi import APIRouter
from app.models import AIScoreRequest, ChatRequest, InsightsRequest
from app.services.cerebras_service import CerebrasService
from app.services.risk_calculator import RiskCalculator

router = APIRouter()
cerebras = CerebrasService()
risk_calc = RiskCalculator()

@router.post("/ai-score")
async def get_ai_score(request: AIScoreRequest):
    politician = request.politician
    
    # Calculate base risk score
    score = risk_calc.calculate_risk_score(politician.dict())
    
    # Get AI insights
    insights = await cerebras.generate_insights(politician.dict())
    
    return {
        "score": score,
        "insights": insights
    }

@router.post("/chat")
async def chat_with_ai(request: ChatRequest):
    response = await cerebras.chat(request.query, request.politician.dict())
    return {"response": response}

@router.post("/insights/wealth")
async def get_wealth_insights(request: InsightsRequest):
    insight = await cerebras.analyze_wealth_pattern(request.politician.dict())
    return {"insight": insight}

@router.post("/red-flags")
async def get_red_flags(request: InsightsRequest):
    flags = await cerebras.detect_red_flags(request.politician.dict())
    return {"flags": flags}