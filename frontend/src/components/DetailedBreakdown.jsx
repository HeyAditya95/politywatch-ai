import React, { useState } from 'react';
// Assuming you have lucide-react installed: npm install lucide-react
import { ChevronDown, DollarSign, Home } from 'lucide-react'; 

/**
 * DetailedBreakdown Component
 * Displays the granular asset details dynamically based on the 'politician' prop.
 * * @param {object} politician - The selected politician object, expected to have a 'detailedBreakdown' field.
 */
export default function DetailedBreakdown({ politician }) {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // 1. DYNAMIC DATA RETRIEVAL & SAFETY CHECKS
  // Safely access the breakdown data, defaulting to an empty structure if missing.
  const detailedAssets = politician.detailedBreakdown || { movable: {}, immovable: {} };
  const movableTotal = politician.movableTotal ? politician.movableTotal.toFixed(2) : 'N/A';
  const immovableTotal = politician.immovableTotal ? politician.immovableTotal.toFixed(2) : 'N/A';
  
  const isDataAvailable = !!politician.detailedBreakdown;

  // Helper function to render the asset details for a person
  const renderAssetDetails = (assets) => (
    <div className="space-y-2">
      {Object.entries(assets).map(([type, assetData]) => {
        // 🎯 LOGIC: Check if data is an object (Immovable) or a number (Movable)
        const isImmovable = typeof assetData === 'object' && assetData !== null;
        
        const value = isImmovable ? assetData.value : assetData;
        const size = isImmovable ? assetData.size : null;
        
        // Skip if the value is null or undefined (but allow 0)
        if (!(value || value === 0)) return null;

        return (
          <div key={type} className="flex justify-between text-sm">
            {/* Converts camelCase (e.g., agri_land) to Title Case (e.g., Agri Land) */}
            <span className="text-gray-600 capitalize">
              {type.replace(/([A-Z])/g, ' $1').replace(/_/g, ' ')}:
            </span>
            <span className="font-semibold text-right">
              {/* Display size first for Immovable assets */}
              {size && (
                  <span className="text-gray-500 text-xs mr-2">{size}</span>
              )}
              ₹{value} Cr
            </span>
          </div>
        );
      })}
    </div>
  );

  // Fallback content if the detailed data structure is not present for the politician
  if (!isDataAvailable) {
      return (
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
              <h3 className="text-xl font-bold text-gray-800 mb-2">📋 Detailed Asset Breakdown for {politician.name}</h3>
              <p className="text-red-700 font-medium">Data Not Structured Yet</p>
              <p className="text-sm text-gray-600 mt-2">
                  Please ensure the `detailedBreakdown`, `movableTotal`, and `immovableTotal` fields 
                  are added to the **{politician.name}** object in your `politicians` array.
              </p>
          </div>
      );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">📋 Detailed Asset Breakdown for {politician.name}</h3>

      {/* Movable Assets */}
      <div className="border border-gray-200 rounded-lg mb-4">
        <button
          onClick={() => toggleSection('movable')}
          className="w-full flex justify-between items-center p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center">
            <DollarSign className="w-6 h-6 mr-3 text-green-600" />
            <div className="text-left">
              <h4 className="font-bold text-lg text-gray-800">Movable Assets</h4>
              <p className="text-sm text-gray-600">Cash, Deposits, Bonds, Vehicles, Shares</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-green-600">₹{movableTotal} Cr</span>
            <ChevronDown 
              className={`w-6 h-6 text-gray-400 transition-transform ${
                expandedSection === 'movable' ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {expandedSection === 'movable' && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mb-4 rounded">
              <p className="text-sm text-yellow-900">
                <strong>Note:</strong> Detailed family-wise movable assets (in Crores).
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Loop through self, spouse, huf */}
              {Object.entries(detailedAssets.movable).map(([person, assets]) => (
                <div key={person} className="bg-white p-4 rounded-lg shadow">
                  <h5 className="font-bold text-gray-700 mb-3 capitalize">
                    {/* FIXED: Use a robust reduction logic to handle sums correctly and prevent the 'toFixed is not a function' error */}
                    {person} ({Object.values(assets).reduce((sum, val) => sum + (Number.isFinite(val) ? val : 0), 0).toFixed(2)} Cr) 
                  </h5>
                  {renderAssetDetails(assets)}
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
            <Home className="w-6 h-6 mr-3 text-blue-600" />
            <div className="text-left">
              <h4 className="font-bold text-lg text-gray-800">Immovable Assets</h4>
              <p className="text-sm text-gray-600">Land, Buildings, Properties (Value + Size)</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold text-blue-600">₹{immovableTotal} Cr</span>
            <ChevronDown 
              className={`w-6 h-6 text-gray-400 transition-transform ${
                expandedSection === 'immovable' ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {expandedSection === 'immovable' && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mb-4 rounded">
              <p className="text-sm text-yellow-900">
                <strong>Note:</strong> Property value is based on declared market value in the affidavit (in Crores).
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Loop through self, spouse, huf */}
              {Object.entries(detailedAssets.immovable).map(([person, assets]) => (
                <div key={person} className="bg-white p-4 rounded-lg shadow">
                  <h5 className="font-bold text-gray-700 mb-3 capitalize">
                    {person} ({Object.values(assets).reduce((sum, val) => sum + (val.value || val), 0).toFixed(2)} Cr)
                  </h5>
                  {renderAssetDetails(assets)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
