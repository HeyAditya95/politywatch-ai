import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AlertTriangle, TrendingUp, Scale, Newspaper } from 'lucide-react';

export default function RedFlagsAlert({ politician }) {
  const [redFlags, setRedFlags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlags = async () => {
      setLoading(true);
      const result = await api.getRedFlags(politician);
      setRedFlags(result.flags || []);
      setLoading(false);
    };
    fetchFlags();
  }, [politician]);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg p-6 text-white">
        <div className="animate-pulse">
          <div className="h-6 bg-white bg-opacity-20 rounded w-1/2 mb-4"></div>
          <div className="h-20 bg-white bg-opacity-20 rounded"></div>
        </div>
      </div>
    );
  }

  const icons = {
    wealth: TrendingUp,
    legal: Scale,
    media: Newspaper,
    pattern: AlertTriangle
  };

  return (
    <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center mb-4">
        <AlertTriangle className="w-8 h-8 mr-3" />
        <h3 className="text-xl font-bold">AI-DETECTED RED FLAGS</h3>
      </div>

      <div className="space-y-3">
        {redFlags.length === 0 ? (
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm">✅ No major red flags detected by AI analysis.</p>
          </div>
        ) : (
          redFlags.map((flag, idx) => {
            const Icon = icons[flag.type] || AlertTriangle;
            return (
              <div key={idx} className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-start">
                  <Icon className="w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-bold mb-1">{flag.title}</p>
                    <p className="text-sm text-red-100">{flag.description}</p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}