import React from 'react';

export default function NewsTimeline({ politician }) {
  // Mock news data - In production, fetch from backend
  const newsTimeline = [
    { date: 'Jan 2024', sentiment: 'negative', color: '#ef4444', headline: 'Corruption allegations surface' },
    { date: 'Mar 2024', sentiment: 'positive', color: '#10b981', headline: 'Development project launched' },
    { date: 'May 2024', sentiment: 'negative', color: '#ef4444', headline: 'Court case hearing' },
    { date: 'Jul 2024', sentiment: 'negative', color: '#ef4444', headline: 'Asset disclosure controversy' },
    { date: 'Sep 2024', sentiment: 'neutral', color: '#f59e0b', headline: 'Policy statement' },
    { date: 'Oct 2024', sentiment: 'positive', color: '#10b981', headline: 'Infrastructure completion' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">📰 News Sentiment Timeline</h3>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Powered by Llama AI</span>
      </div>

      <div className="relative py-4">
        <div className="flex justify-between">
          {newsTimeline.map((item, idx) => (
            <div 
              key={idx} 
              className="text-center cursor-pointer hover:scale-110 transition-transform group"
              title={item.headline}
            >
              <div 
                className="w-4 h-4 rounded-full mx-auto mb-2"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-xs text-gray-600">{item.date}</p>
              <p 
                className="text-xs font-bold capitalize mt-1"
                style={{ color: item.color }}
              >
                {item.sentiment}
              </p>
              <div className="hidden group-hover:block absolute bg-gray-800 text-white text-xs rounded p-2 mt-2 w-48 z-10">
                {item.headline}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -z-10" />
      </div>

      <div className="mt-4 bg-gray-50 border-l-4 border-gray-400 p-3 rounded">
        <p className="text-sm text-gray-700">
          <strong>AI Analysis:</strong> Overall sentiment is mixed with 3 negative, 2 positive, and 1 neutral coverage this year. Key themes detected: corruption, development, legal proceedings.
        </p>
      </div>
    </div>
  );
}