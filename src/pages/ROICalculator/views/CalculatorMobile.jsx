import React, { useMemo } from 'react';
import './CalculatorMobile.css';
import BottomNav from '../../../components/BottomNav/BottomNav';

const CalculatorMobile = ({ 
  profile, 
  formData, 
  roiResult, 
  handleInputChange, 
  handleSave, 
  isLoading 
}) => {
  // Score and Ring Logic
  const score = roiResult?.roiScore || 75;
  const strokeDashoffset = useMemo(() => {
    const circumference = 239; // circum = 2 * pi * r (r=38 from ref)
    return circumference - (circumference * score) / 100;
  }, [score]);

  const scoreLabel = useMemo(() => {
    if (score >= 80) return "Excellent ROI";
    if (score >= 65) return "Strong ROI";
    if (score >= 45) return "Moderate ROI";
    return "Low ROI";
  }, [score]);

  // INR Estimations (Static conversion at ~83 for UI demo)
  const totalLoanUSD = formData.loanAmount || 0;
  const totalDebtINR = (totalLoanUSD * 83 / 100000).toFixed(1); // In Lakhs
  const monthlyEMI = Math.round((totalLoanUSD * 1.05 * 83) / (10 * 12)); // Rough approximation for UI

  return (
    <div className="sw-calculator-mobile">
      {/* Header */}
      <div className="m-header-bar">
        <span className="m-back-btn" onClick={() => window.history.back()}>←</span>
        <div className="m-header-title">ROI Calculator</div>
        <span className="m-badge mb-teal" style={{ marginLeft: 'auto' }}>Live</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        
        {/* Live Result Hero */}
        <div className="m-result-hero">
          <svg viewBox="0 0 90 90" width="70" height="70" className="m-hero-ring">
            <circle cx="45" cy="45" r="38" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8"/>
            <circle 
              cx="45" cy="45" r="38" fill="none" stroke="url(#rmg)" strokeWidth="8" 
              strokeDasharray="239" 
              strokeDashoffset={strokeDashoffset} 
              strokeLinecap="round" 
              transform="rotate(-90 45 45)"
            />
            <defs>
              <linearGradient id="rmg" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00C9A7"/><stop offset="100%" stopColor="#4FC3F7"/>
              </linearGradient>
            </defs>
            <text x="45" y="41" textAnchor="middle" fontFamily="Syne" fontSize="18" fontWeight="800" fill="white">{score}</text>
            <text x="45" y="53" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill="rgba(255,255,255,0.3)">/100</text>
          </svg>
          <div style={{ flex: 1 }}>
            <div className="m-hero-lbl">{scoreLabel}</div>
            <div className="m-hero-sub">Payback · {roiResult?.breakEvenYear || '3.2'} yrs</div>
            <div className="m-hero-stats">
              <div className="m-hstat-box">
                <div className="m-hstat-lbl">Cost</div>
                <div className="m-hstat-val">${(roiResult?.totalInvestment || 158000).toLocaleString()}</div>
              </div>
              <div className="m-hstat-box teal">
                <div className="m-hstat-lbl" style={{ color: 'var(--teal)' }}>Salary</div>
                <div className="m-hstat-val teal">${(formData.expectedSalary || 118000).toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="m-fg">
          <label className="m-fl">University</label>
          <input 
            className="m-fi" 
            type="text" 
            value={formData.universityName} 
            onChange={(e) => handleInputChange('universityName', e.target.value)}
          />
        </div>

        <div className="m-grid-2">
          <div className="m-fg">
            <label className="m-fl">Annual Tuition</label>
            <input 
              className="m-fi" 
              type="text" 
              value={`$${formData.annualTuition.toLocaleString()}`}
              onChange={(e) => handleInputChange('annualTuition', parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0)}
            />
          </div>
          <div className="m-fg">
            <label className="m-fl">Living Cost</label>
            <input 
              className="m-fi" 
              type="text" 
              value={`$${formData.annualLivingCost.toLocaleString()}`}
              onChange={(e) => handleInputChange('annualLivingCost', parseFloat(e.target.value.replace(/[^0-9.]/g, '')) || 0)}
            />
          </div>
        </div>

        {/* Sliders */}
        <div className="m-fg">
          <label className="m-fl">Expected OPT Salary</label>
          <div className="m-slider-val">${formData.expectedSalary.toLocaleString()}</div>
          <input 
            type="range" 
            min="60000" max="200000" step="1000" 
            value={formData.expectedSalary} 
            onChange={(e) => handleInputChange('expectedSalary', parseInt(e.target.value))}
          />
          <div className="m-slider-range"><span>$60K</span><span style={{ color: 'var(--teal)' }}>DOL $118K</span><span>$200K</span></div>
        </div>

        <div className="m-fg">
          <label className="m-fl">Loan Amount</label>
          <div className="m-slider-val">${formData.loanAmount.toLocaleString()}</div>
          <input 
            type="range" 
            min="0" max="150000" step="1000" 
            value={formData.loanAmount} 
            onChange={(e) => handleInputChange('loanAmount', parseInt(e.target.value))}
          />
          <div className="m-slider-range"><span>$0</span><span>$150K</span></div>
        </div>

        {/* Breakdown Card */}
        <div className="m-card">
          <div className="m-section">Cost Breakdown</div>
          <div className="m-prog-wrap">
            <div className="m-prog-label"><span style={{ color: 'var(--muted)' }}>Tuition (2yr)</span><span style={{ color: 'var(--white)', fontFamily: 'var(--fm)' }}>$116K</span></div>
            <div className="m-prog-track"><div className="m-prog-fill" style={{ width: '73%', background: 'var(--teal)' }}></div></div>
          </div>
          <div className="m-prog-wrap" style={{ marginTop: '10px' }}>
            <div className="m-prog-label"><span style={{ color: 'var(--muted)' }}>Cost of Living</span><span style={{ color: 'var(--white)', fontFamily: 'var(--fm)' }}>$42K</span></div>
            <div className="m-prog-track"><div className="m-prog-fill" style={{ width: '27%', background: 'var(--sky)' }}></div></div>
          </div>
          <div className="m-prog-wrap" style={{ marginTop: '10px' }}>
            <div className="m-prog-label"><span style={{ color: 'var(--muted)' }}>Loan Interest</span><span style={{ color: 'var(--white)', fontFamily: 'var(--fm)' }}>$29K</span></div>
            <div className="m-prog-track"><div className="m-prog-fill" style={{ width: '18%', background: 'var(--amber)' }}></div></div>
          </div>
        </div>

        <div style={{ height: '12px' }} />

        {/* INR View */}
        <div className="m-card m-card-amber">
          <div className="m-section" style={{ color: 'var(--amber)' }}>INR Insights (₹)</div>
          <div className="m-grid-2">
            <div><div style={{ fontSize: '9px', color: 'var(--hint)' }}>Total debt</div><div style={{ fontFamily: 'var(--fd)', fontSize: '16px', fontWeight: '700', color: 'var(--white)' }}>₹{totalDebtINR}L</div></div>
            <div><div style={{ fontSize: '9px', color: 'var(--hint)' }}>Monthly EMI (est)</div><div style={{ fontFamily: 'var(--fd)', fontSize: '16px', fontWeight: '700', color: 'var(--white)' }}>₹{(monthlyEMI/1000).toFixed(1)}K</div></div>
          </div>
        </div>

        <div style={{ height: '24px' }} />

        <button className="btn btn-primary btn-full" onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Calculating...' : 'Save Scenario'}
        </button>

        <div style={{ height: '60px' }}></div>
      </div>

      <BottomNav activeTab="calculator" />
    </div>
  );
};

export default CalculatorMobile;
