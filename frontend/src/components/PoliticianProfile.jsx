import React from 'react';

export default function PoliticianProfile({ politician, displayedNetWorth, growthPct, hasYearData, selectedYear }) {
  const displayGrowth = growthPct > 0 ? `+${growthPct.toFixed(0)}%` : `${growthPct.toFixed(0)}%`;

  return (
    <section className="grid md:grid-cols-4 gap-6 items-start">
      {/* Profile Card */}
      <div className="col-span-1 bg-white rounded-xl shadow-lg p-6">
        <img
          src={politician.photo}
          alt={politician.name}
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">{politician.name}</h2>
          <p className="text-gray-600 mt-2">{politician.party}</p>
          <p className="text-sm text-gray-500 mt-1">{politician.constituency}</p>
          <div className="mt-4 text-sm text-gray-600">
            <p><strong>Education:</strong> {politician.education}</p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="col-span-3 bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {politician.name} <span className="text-sm text-gray-500">| {politician.party}</span>
        </h3>
        <p className="text-sm text-gray-600 mb-6">{politician.constituency}</p>

        <div className="grid grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-600 text-xs font-semibold mb-1">💰 Total Assets</p>
            <p className="text-2xl font-bold text-green-700">₹{displayedNetWorth} Cr</p>
            {!hasYearData && selectedYear !== "All Years" && (
              <p className="text-xs text-gray-500 mt-1">Latest available</p>
            )}
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-600 text-xs font-semibold mb-1">📈 Lifetime Growth</p>
            <p className={`text-2xl font-bold ${growthPct >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {displayGrowth}
            </p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-red-600 text-xs font-semibold mb-1">⚖️ Liabilities</p>
            <p className="text-2xl font-bold text-red-700">₹{politician.liabilities} Cr</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-purple-600 text-xs font-semibold mb-1">⚖️ Cases Pending</p>
            <p className="text-2xl font-bold text-purple-700">{politician.casesPending}</p>
          </div>
        </div>
      </div>
    </section>
  );
}