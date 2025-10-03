class RiskCalculator:
    def calculate_risk_score(self, politician: dict) -> int:
        """Calculate risk score (0-100) based on politician data"""
        score = 50  # Base score
        
        # Factor 1: Pending cases
        cases = politician.get('casesPending', 0)
        if cases > 20:
            score += 25
        elif cases > 10:
            score += 15
        elif cases > 5:
            score += 10
        
        # Factor 2: Wealth growth
        timeline = politician.get('timeline', [])
        if len(timeline) >= 2:
            first = timeline[0]['netWorth']
            last = timeline[-1]['netWorth']
            growth_rate = (last / first) if first > 0 else 1
            
            if growth_rate > 5:  # 500% growth
                score += 20
            elif growth_rate > 3:  # 300% growth
                score += 15
            elif growth_rate > 2:  # 200% growth
                score += 10
        
        # Factor 3: High absolute wealth
        if politician.get('totalAssets', 0) > 100:
            score += 5
        
        # Factor 4: High liabilities
        if politician.get('liabilities', 0) > 10:
            score += 5
        
        # Cap at 100
        return min(100, max(0, score))