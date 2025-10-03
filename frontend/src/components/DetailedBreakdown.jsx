import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function DetailedBreakdown({ politician }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Mock detailed asset data
  const detailedAssets = {
    movable: {
      self: { cash: 0.5, deposits: 1.2, bonds: 0.8, vehicles: 0.3 },
      spouse: { cash: 0.2, deposits: 0.8, bonds: 0.3, vehicles: 0.2 },
      huf: { cash: 0.1, deposits: 0.3, bonds: 0.1, vehicles: 0 }
    },
    immovable: {
      self: { agricultural: 8, nonAgricultural: 4, buildings: 3 },
      spouse: { agricultural: 3, nonAgricultural: 2, buildings: 3 },
      huf: { agricultural: 2, nonAgricultural: 1, buildings: 2 }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">📋 Detailed Asset Breakdown</h3>

      {/* Movable Assets */}
      <div className="border border-gray-200 rounded-lg mb-4">
        <button
          onClick={() => toggleSection('movable')}
          className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <span className="text-2xl mr-3">💵</span>
            <div className="text-left">
              <h4 className="font-bold text-lg text-gray-800">Movable Assets</h4>
              <p className="text-sm text-gray-600">Cash, Deposits, Bonds, Vehicles</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-green-600">₹5.2 Cr</span>
            <ChevronDown 
              className={`w-6 h-6 text-gray-400 transition-transform ${
                expandedSection === 'movable' ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {expandedSection === 'movable' && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(detailedAssets.movable).map(([person, assets]) => (
                <div key={person} className="bg-white p-4 rounded-lg shadow">
                  <h5 className="font-bold text-gray-700 mb-3 capitalize">{person}</h5>
                  <div className="space-y-2">
                    {Object.entries(assets).map(([type, value]) => (
                      <div key={type} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{type}:</span>
                        <span className="font-semibold">₹{value} Cr</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Immovable Assets */}
      <div className="border border-gray-200 rounded-lg">
        <button
          onClick={() => toggleSection('immovable')}
          className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <span className="text-2xl mr-3">🏠</span>
            <div className="text-left">
              <h4 className="font-bold text-lg text-gray-800">Immovable Assets</h4>
              <p className="text-sm text-gray-600">Land, Buildings, Properties</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-blue-600">₹11 Cr</span>
            <ChevronDown 
              className={`w-6 h-6 text-gray-400 transition-transform ${
                expandedSection === 'immovable' ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {expandedSection === 'immovable' && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(detailedAssets.immovable).map(([person, assets]) => (
                <div key={person} className="bg-white p-4 rounded-lg shadow">
                  <h5 className="font-bold text-gray-700 mb-3 capitalize">{person}</h5>
                  <div className="space-y-2">
                    {Object.entries(assets).map(([type, value]) => (
                      <div key={type} className="flex justify-between text-sm">
                        <span className="text-gray-600 capitalize">{type}:</span>
                        <span className="font-semibold">{value} acres</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}