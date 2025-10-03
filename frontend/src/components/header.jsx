import React, { useState, useMemo } from 'react';

export default function Header({ 
  politicians, 
  selected, 
  setSelected, 
  selectedYear, 
  setSelectedYear,
  partyFilter,
  setPartyFilter,
  minAssets,
  setMinAssets
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const parties = useMemo(
    () => ["All", ...Array.from(new Set(politicians.map((p) => p.party)))],
    [politicians]
  );

  const filtered = useMemo(() => {
    return politicians.filter((p) => {
      const matchesName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesParty = partyFilter === "All" ? true : p.party === partyFilter;
      const matchesMinAssets = minAssets === "" ? true : p.totalAssets >= parseFloat(minAssets);
      return matchesName && matchesParty && matchesMinAssets;
    });
  }, [searchTerm, partyFilter, minAssets, politicians]);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🏛️</span>
            </div>
            <h1 className="text-2xl font-bold">PolityWatch AI</h1>
          </div>

          <div className="flex-1 max-w-2xl relative">
            <input
              placeholder="🔍 Search Politician..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {searchTerm && (
              <div className="absolute left-0 right-0 bg-white shadow-lg rounded mt-2 max-h-60 overflow-auto z-20">
                {filtered.map((p) => (
                  <div
                    key={p.name}
                    onClick={() => {
                      setSelected(p);
                      setSearchTerm("");
                    }}
                    className="px-4 py-2 hover:bg-indigo-50 cursor-pointer text-gray-800"
                  >
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-gray-500">
                      {p.party} • {p.constituency}
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="px-4 py-2 text-gray-500">No results</div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 rounded-lg text-gray-800 focus:outline-none"
            >
              <option>All Years</option>
              {[2006, 2007, 2009, 2011, 2012, 2014, 2015, 2016, 2017, 2019, 2020, 2021, 2022, 2024, 2025].map(year => (
                <option key={year}>{year}</option>
              ))}
            </select>

            <div className="relative">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50"
              >
                Filters
              </button>
              {showFilters && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg p-4 z-30 text-gray-800">
                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Party</label>
                    <select
                      value={partyFilter}
                      onChange={(e) => setPartyFilter(e.target.value)}
                      className="w-full p-2 border rounded"
                    >
                      {parties.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Min Assets (Cr)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={minAssets}
                      onChange={(e) => setMinAssets(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>

                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => {
                        setPartyFilter("All");
                        setMinAssets("");
                        setShowFilters(false);
                      }}
                      className="px-3 py-2 border rounded hover:bg-gray-50"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}