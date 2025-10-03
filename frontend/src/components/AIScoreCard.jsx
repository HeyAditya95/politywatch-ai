import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AlertTriangle } from 'lucide-react';

export default function AIScoreCard({ politician }) {
  const [aiScore, setAiScore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScore = async () => {
      setLoading(true);
      const result = await api.getAIScore(politician);
      setAiScore(result);
      setLoading(false);
    };
    fetchScore();
  }, [politician]);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const score = aiScore?.score || 50;
  const riskLevel = score > 70 ? 'High Risk' : score > 40 ? 'Moderate Risk' : 'Low Risk';
  const riskColor = score > 70 ? 'red' : score > 40 ? 'yellow' : 'green';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">🎯 AI Accountability Score</h3>
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Powered by Cerebras AI</span>
      </div>

      <div className="flex items-center justify-center mb-6">
        <div className="relative w-40 h-40">
          <svg className="transform -rotate-90 w-40 h-40">
            <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="10" fill="none"/>
            <circle 
              cx="80" 
              cy="80" 
              r="70" 
              stroke={riskColor === 'red' ? '#ef4444' : riskColor === 'yellow' ? '#f59e0b' : '#10b981'} 
              strokeWidth="10" 
              fill="none"
              strokeDasharray="440"
              strokeDashoffset={440 - (440 * score) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${riskColor === 'red' ? 'text-red-600' : riskColor === 'yellow' ? 'text-yellow-600' : 'text-green-600'}`}>
              {score}
            </span>
            <span className="text-gray-600 text-sm">/100</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mb-6">
        <span className={`${riskColor === 'red' ? 'bg-red-100 text-red-700' : riskColor === 'yellow' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'} px-6 py-2 rounded-full font-bold text-lg flex items-center gap-2`}>
          <AlertTriangle size={20} />
          {riskLevel}
        </span>
      </div>

      <div className="space-y-3">
        {aiScore?.insights?.map((insight, idx) => (
          <div key={idx} className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
            <p className="text-sm text-blue-800">{insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}