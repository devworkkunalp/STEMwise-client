import React from 'react';
import './CompareMobile.css';
import { 
  Plus, 
  Trash2, 
  Sparkles,
  TrendingUp,
  Clock,
  ShieldAlert,
  DollarSign
} from 'lucide-react';
import BottomNav from '../../../components/BottomNav/BottomNav';

const CompareMobile = ({ 
  profile, 
  selectedCodes,
  comparisonData, 
  getCountryInfo, 
  bestMetrics, 
  isLoading,
  addCountry,
  removeCountry
}) => {
  // Available countries beyond selected ones
  const availableOptions = [
    { code: 'US', flag: '🇺🇸', name: 'USA' },
    { code: 'GB', flag: '🇬🇧', name: 'UK' },
    { code: 'DE', flag: '🇩🇪', name: 'Germany' },
    { code: 'CA', flag: '🇨🇦', name: 'Canada' },
    { code: 'AU', flag: '🇦🇺', name: 'Australia' }
  ];

  const getFlag = (code) => {
    return getCountryInfo(code)?.flagEmoji || availableOptions.find(o => o.code === code)?.flag || '🌐';
  };

  const getCountryName = (code) => {
    return getCountryInfo(code)?.name || availableOptions.find(o => o.code === code)?.name || code;
  };

  return (
    <div className="sw-compare-mobile">
      {/* Header */}
      <div className="m-compare-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px', color: 'var(--muted)', cursor: 'pointer' }} onClick={() => window.history.back()}>←</span>
          <div style={{ fontFamily: 'var(--fd)', fontSize: '16px', fontWeight: '700', color: 'var(--white)' }}>Country Compare</div>
        </div>
        <div className="m-currency-pill">INR (₹)</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        
        {/* Country Selector Chips */}
        <div className="m-section-label">Select Countries to Compare</div>
        <div className="m-country-chips">
          {availableOptions.map((opt) => {
            const isSelected = selectedCodes.includes(opt.code);
            return (
              <button 
                key={opt.code} 
                className={`m-chip ${isSelected ? 'is-selected' : ''}`}
                onClick={() => isSelected ? removeCountry(opt.code) : addCountry(opt.code)}
              >
                <span>{opt.flag}</span>
                <span>{opt.name}</span>
                {isSelected && <Plus size={10} style={{ transform: 'rotate(45deg)' }} />}
              </button>
            );
          })}
        </div>

        {/* Dynamic Cards Grid */}
        <div className="m-country-grid">
          {comparisonData.map((res) => {
            const isBestROI = res.roiScore === bestMetrics.maxRoi;
            const isFastPayback = res.breakEvenYear === bestMetrics.minPayback;
            
            return (
              <div key={res.countryCode} className={`m-country-card ${res.countryCode === 'US' ? 'm-card-teal' : ''}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="m-card-flag">{getFlag(res.countryCode)}</span>
                  {isBestROI && <span className="m-mini-badge teal"><Sparkles size={8} /> Best</span>}
                  {isFastPayback && !isBestROI && <span className="m-mini-badge sky">Fast</span>}
                </div>
                <div className="m-card-name">{getCountryName(res.countryCode)}</div>
                <div className={`m-card-score ${isBestROI ? 'teal' : ''}`}>
                  {res.roiScore}
                </div>
                <div className="m-card-meta">
                   {res.breakEvenYear}y Payback
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Matrix */}
        <div className="m-section-label" style={{ marginTop: '24px' }}>Outcome Matrix</div>
        <div className="m-table-wrap">
          <table className="m-table">
            <thead>
              <tr>
                <th>Metric</th>
                {comparisonData.map(res => (
                  <th key={res.countryCode} className={res.countryCode === 'US' ? 'hl' : ''}>
                    {getFlag(res.countryCode)} {res.countryCode}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><TrendingUp size={10} /> ROI Score</td>
                {comparisonData.map(res => (
                  <td key={res.countryCode} className={res.roiScore === bestMetrics.maxRoi ? 'best' : ''}>
                    {res.roiScore}
                  </td>
                ))}
              </tr>
              <tr>
                <td><DollarSign size={10} /> Total Cost</td>
                {comparisonData.map(res => (
                  <td key={res.countryCode}>
                    ₹{((res.totalInvestment * 84) / 100000).toFixed(1)}L
                  </td>
                ))}
              </tr>
              <tr>
                <td><Clock size={10} /> Payback</td>
                {comparisonData.map(res => (
                  <td key={res.countryCode} className={res.breakEvenYear === bestMetrics.minPayback ? 'best' : ''}>
                    {res.breakEvenYear}y
                  </td>
                ))}
              </tr>
              <tr>
                <td><ShieldAlert size={10} /> Visa Risk</td>
                {comparisonData.map(res => {
                  const risk = getCountryInfo(res.countryCode)?.visaRisk || 'Medium';
                  return (
                    <td key={res.countryCode}>
                      <span className={`m-risk-dot ${risk.toLowerCase()}`}></span>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ height: '60px' }}></div>
      </div>
      <BottomNav activeTab="compare" />
    </div>
  );
};

export default CompareMobile;
