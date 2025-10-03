const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = {
  // Get AI-powered risk score
  async getAIScore(politician) {
    try {
      const response = await fetch(`${API_BASE}/ai-score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ politician })
      });
      if (!response.ok) throw new Error('Failed to fetch AI score');
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      return { score: 50, insights: ['Unable to generate AI score'] }; // Fallback
    }
  },

  // Chat with AI
  async chatWithAI(query, politician) {
    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, politician })
      });
      if (!response.ok) throw new Error('Chat failed');
      return await response.json();
    } catch (error) {
      console.error('Chat Error:', error);
      return { response: 'Sorry, AI is temporarily unavailable.' };
    }
  },

  // Get AI insights for wealth timeline
  async getWealthInsights(politician) {
    try {
      const response = await fetch(`${API_BASE}/insights/wealth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ politician })
      });
      if (!response.ok) throw new Error('Failed to fetch insights');
      return await response.json();
    } catch (error) {
      console.error('Insights Error:', error);
      return { insight: 'Unable to generate insights' };
    }
  },

  // Get red flags
  async getRedFlags(politician) {
    try {
      const response = await fetch(`${API_BASE}/red-flags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ politician })
      });
      if (!response.ok) throw new Error('Failed to fetch red flags');
      return await response.json();
    } catch (error) {
      console.error('Red Flags Error:', error);
      return { flags: [] };
    }
  }
};