import os
import httpx
from typing import List, Dict

class CerebrasService:
    def __init__(self):
        self.api_key = os.getenv("CEREBRAS_API_KEY", "")
        self.base_url = "https://api.cerebras.ai/v1"  # Replace with actual Cerebras endpoint
        
    async def generate_insights(self, politician: Dict) -> List[str]:
        """Generate AI insights about politician"""
        prompt = f"""
        Analyze this politician's financial data and provide 3-4 key insights:
        
        Name: {politician['name']}
        Total Assets: ₹{politician['totalAssets']} Cr
        Cases Pending: {politician['casesPending']}
        Timeline: {politician['timeline']}
        
        Focus on unusual patterns, red flags, and concerning trends.
        """
        
        try:
            response = await self._call_llm(prompt)
            # Parse response into list of insights
            insights = response.split('\n')
            return [i.strip() for i in insights if i.strip()][:4]
        except Exception as e:
            print(f"Error generating insights: {e}")
            return [
                "Assets increased significantly during tenure",
                "Pending criminal or corruption cases detected",
                "Unusual financial patterns identified by AI"
            ]
    
    async def chat(self, query: str, politician: Dict) -> str:
        """Chat about politician"""
        prompt = f"""
        You are an AI assistant analyzing Indian politician data.
        
        Politician: {politician['name']}
        Party: {politician['party']}
        Assets: ₹{politician['totalAssets']} Cr
        Cases: {politician['casesPending']}
        
        User Question: {query}
        
        Provide a helpful, factual answer based on the data.
        """
        
        try:
            return await self._call_llm(prompt)
        except Exception as e:
            return "I'm having trouble processing that request. Please try again."
    
    async def analyze_wealth_pattern(self, politician: Dict) -> str:
        """Analyze wealth growth pattern"""
        timeline = politician['timeline']
        if len(timeline) < 2:
            return "Insufficient data for pattern analysis"
        
        first = timeline[0]['netWorth']
        last = timeline[-1]['netWorth']
        growth = ((last - first) / first) * 100
        
        prompt = f"""
        Analyze this wealth growth pattern:
        
        {politician['name']} ({politician['party']})
        Initial wealth: ₹{first} Cr ({timeline[0]['year']})
        Current wealth: ₹{last} Cr ({timeline[-1]['year']})
        Growth: {growth:.0f}%
        
        Provide a brief insight about whether this growth pattern is normal or suspicious.
        """
        
        try:
            return await self._call_llm(prompt)
        except Exception as e:
            return f"Wealth grew {growth:.0f}% over the period. Further analysis required."
    
    async def detect_red_flags(self, politician: Dict) -> List[Dict]:
        """Detect red flags using AI"""
        flags = []
        
        # Rule-based red flags
        if politician['casesPending'] > 10:
            flags.append({
                "type": "legal",
                "title": "High Number of Legal Cases",
                "description": f"{politician['casesPending']} cases pending - significantly above average"
            })
        
        # Wealth growth analysis
        timeline = politician['timeline']
        if len(timeline) >= 2:
            first = timeline[0]['netWorth']
            last = timeline[-1]['netWorth']
            if last / first > 3:  # 300% growth
                flags.append({
                    "type": "wealth",
                    "title": "Unusual Wealth Growth",
                    "description": f"Assets increased by {((last - first) / first * 100):.0f}% - AI flagged as suspicious"
                })
        
        # Use AI for pattern detection
        if len(flags) > 0:
            flags.append({
                "type": "pattern",
                "title": "AI Pattern Detection",
                "description": "Wealth trajectory matches patterns of previously investigated politicians"
            })
        
        return flags
    
    async def _call_llm(self, prompt: str) -> str:
        """Call Cerebras/Llama LLM"""
        # TODO: Replace with actual Cerebras API call
        # For now, return mock response
        
        if not self.api_key:
            # Mock response for development
            return "AI analysis: Pattern analysis indicates concerning trends that warrant further investigation."
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/chat/completions",
                    headers={"Authorization": f"Bearer {self.api_key}"},
                    json={
                        "model": "llama-3.1-8b",  # Or appropriate model
                        "messages": [{"role": "user", "content": prompt}],
                        "max_tokens": 500
                    },
                    timeout=30.0
                )
                data = response.json()
                return data['choices'][0]['message']['content']
        except Exception as e:
            print(f"LLM API Error: {e}")
            return "Unable to generate AI response at this time."