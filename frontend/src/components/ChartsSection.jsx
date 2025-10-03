import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { api } from '../services/api';

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function ChartsSection({ politician }) {
  const [wealthInsight, setWealthInsight] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      const result = await api.getWealthInsights(politician);
      setWealthInsight(result.insight || '');
      setLoading(false);
    };
    fetchInsights();
  }, [politician]);

  return (
    <section className="grid md:grid-cols-2 gap-6">
      {/* Wealth Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-xl font-bold text-gray-800 mb-4">💰 Wealth Growth Over Time</h4>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={politician.timeline}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis label={{ value: '₹ Crores', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="netWorth" stroke="#2563eb" strokeWidth={3} name="Net Worth" />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
          <p className="text-sm text-blue-800">
            <strong>💡 AI Insight:</strong> {loading ? 'Analyzing...' : wealthInsight}
          </p>
        </div>
      </div>

      {/* Asset Distribution */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-xl font-bold text-gray-800 mb-4">📊 Asset Distribution</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={politician.assetDistribution}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {politician.assetDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 bg-purple-50 border-l-4 border-purple-500 p-3 rounded">
          <p className="text-sm text-purple-800">
            <strong>💡 AI Insight:</strong> Asset composition analysis shows wealth concentration patterns.
          </p>
        </div>
      </div>
    </section>
  );
}