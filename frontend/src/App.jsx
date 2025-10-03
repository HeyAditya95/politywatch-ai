import React, { useState, useMemo } from 'react';
import { politicians } from './data/politicians';
import Header from './components/header';
import PoliticianProfile from './components/PoliticianProfile';
import AIScoreCard from './components/AIScoreCard';
import RedFlagsAlert from './components/RedFlagsAlert';
import ChartsSection from './components/ChartsSection';
import NewsTimeline from './components/NewsTimeline';
import DetailedBreakdown from './components/DetailedBreakdown';
import AIChat from './components/AIChat';

export default function App() {
  const [selected, setSelected] = useState(politicians[0]);
  const [selectedYear, setSelectedYear] = useState("All Years");
  const [partyFilter, setPartyFilter] = useState("All");
  const [minAssets, setMinAssets] = useState("");

  // Calculate displayed values
  const getNetWorthForYear = (p, yearStr) => {
    if (!yearStr || yearStr === "All Years") return null;
    const year = parseInt(yearStr, 10);
    if (Number.isNaN(year)) return null;
    const entry = p.timeline.find((t) => t.year === year);
    return entry ? entry.netWorth : null;
  };

  const displayedNetWorth = getNetWorthForYear(selected, selectedYear) ?? selected.totalAssets;
  const hasYearData = getNetWorthForYear(selected, selectedYear) !== null;

  const firstAsset = selected.timeline[0]?.netWorth || selected.totalAssets;
  const growthPct = ((selected.totalAssets - firstAsset) / firstAsset) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        politicians={politicians}
        selected={selected}
        setSelected={setSelected}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        partyFilter={partyFilter}
        setPartyFilter={setPartyFilter}
        minAssets={minAssets}
        setMinAssets={setMinAssets}
      />

      <main className="container mx-auto px-6 py-8 space-y-6">
        <PoliticianProfile
          politician={selected}
          displayedNetWorth={displayedNetWorth}
          growthPct={growthPct}
          hasYearData={hasYearData}
          selectedYear={selectedYear}
        />

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <AIScoreCard politician={selected} />
          </div>
          <RedFlagsAlert politician={selected} />
        </div>

        <ChartsSection politician={selected} />

        <NewsTimeline politician={selected} />

        <DetailedBreakdown politician={selected} />

        <AIChat politician={selected} />

        {/* Footer */}
        <div className="text-center text-gray-600 text-sm py-8">
          <p className="mb-2">Built for FutureStack GenAI Hackathon 2025</p>
          <div className="flex justify-center items-center space-x-4">
            <span className="font-semibold">🚀 Cerebras AI</span>
            <span>|</span>
            <span className="font-semibold">🦙 Meta Llama</span>
            <span>|</span>
            <span className="font-semibold">🐳 Docker</span>
          </div>
        </div>
      </main>
    </div>
  );
}
