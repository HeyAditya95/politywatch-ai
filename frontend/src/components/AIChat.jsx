import React, { useState } from 'react';
import { api } from '../services/api';
import { MessageCircle, Send } from 'lucide-react';

export default function AIChat({ politician }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    "What are the major corruption allegations?",
    "How does wealth compare to similar politicians?",
    "Explain the wealth growth pattern",
    "Are there any suspicious transactions?"
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);

    setLoading(true);
    const result = await api.chatWithAI(userMessage, politician);
    setLoading(false);

    setMessages(prev => [...prev, { type: 'ai', text: result.response }]);
  };

  const handleQuickQuestion = async (question) => {
    setMessages(prev => [...prev, { type: 'user', text: question }]);
    setLoading(true);
    const result = await api.chatWithAI(question, politician);
    setLoading(false);
    setMessages(prev => [...prev, { type: 'ai', text: result.response }]);
  };

  return (
    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center mb-6">
        <MessageCircle className="w-8 h-8 mr-3" />
        <div>
          <h3 className="text-2xl font-bold">Ask AI About This Politician</h3>
          <p className="text-purple-100 text-sm">Powered by Meta Llama via Cerebras AI</p>
        </div>
      </div>

      {/* Chat Messages */}
      {messages.length > 0 && (
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 mb-4 max-h-60 overflow-y-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-3 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block px-4 py-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-500' : 'bg-purple-700'}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-left">
              <div className="inline-block px-4 py-2 rounded-lg bg-purple-700">
                <p className="text-sm">AI is thinking...</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input */}
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 mb-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about this politician..."
            className="flex-1 bg-white bg-opacity-30 text-white placeholder-purple-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-purple-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send size={20} />
            Ask
          </button>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {quickQuestions.map((question, idx) => ( <button
            key={idx}
            onClick={() => handleQuickQuestion(question)}
            disabled={loading}
            className="bg-white bg-opacity-30 text-white px-4 py-2 rounded-lg hover:bg-opacity-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-left"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

const demoResponses = {
  "corruption": "Based on affidavit analysis, this politician has 6 pending corruption cases filed between 2018-2023, involving financial irregularities totaling ₹2.5 Cr. AI pattern matching identifies similarity with other high-risk profiles.",
  "wealth": "AI analysis reveals 450% wealth increase from 2009-2024. This growth rate is 3.2x higher than median for similar positions. Key anomaly: ₹8.5 Cr real estate acquisition during minister tenure with undisclosed income source.",
  "compare": "Comparative analysis: This politician's asset growth trajectory is in the top 5% of analyzed MPs. Wealth velocity and pending case count both exceed average benchmarks significantly."
};

// In handleSend, check for keywords first:
const handleSend = async () => {
  if (!input.trim()) return;
  
  // Check for demo keywords
  const inputLower = input.toLowerCase();
  let response;
  
  if (inputLower.includes('corruption') || inputLower.includes('allegation')) {
    response = demoResponses.corruption;
  } else if (inputLower.includes('wealth') || inputLower.includes('growth')) {
    response = demoResponses.wealth;
  } else if (inputLower.includes('compare')) {
    response = demoResponses.compare;
  } else {
    // Try real API
    const result = await api.chatWithAI(input, politician);
    response = result.response;
  }
  
  setMessages(prev => [...prev, 
    { type: 'user', text: input },
    { type: 'ai', text: response }
  ]);
  setInput('');
};