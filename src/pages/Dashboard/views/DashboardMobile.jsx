import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardMobile.css';
import BottomNav from '../../../components/BottomNav/BottomNav';

const DashboardMobile = ({ 
  profile, 
  user, 
  roiResult, 
  handleRecalculate, 
  isLoading, 
  getGreeting, 
  displayName 
}) => {
  const navigate = useNavigate();
  // SVG Ring Calculation
  const score = roiResult?.roiScore || 75;
  const strokeDashoffset = useMemo(() => {
    const circumference = 264; // Based on r=42 from reference
    return circumference - (circumference * score) / 100;
  }, [score]);

  const scoreLabel = useMemo(() => {
    if (score >= 80) return "Excellent ROI";
    if (score >= 65) return "Strong ROI";
    if (score >= 45) return "Moderate ROI";
    return "Low ROI";
  }, [score]);

  const intakeVal = profile?.intake || "Fall 2026";
  const degreeVal = profile?.degreeLevel === 1 ? 'MS CS' : 'PhD';
  const universityVal = profile?.universityName || profile?.university || "CMU";
  const countryVal = profile?.nationality || "India";

  return (
    <div className="sw-dashboard-mobile">
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 12px' }}>
        
        {/* Header */}
        <div className="m-dashboard-header">
          <div style={{ fontFamily: 'var(--fd)', fontSize: '16px', fontWeight: '700', color: 'var(--white)' }}>
            {getGreeting()} 👋
          </div>
          <div 
            className="m-user-avatar" 
            onClick={() => navigate('/profile')}
            style={{ cursor: 'pointer' }}
          >
            {displayName?.[0]?.toUpperCase() || 'A'}
          </div>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--muted)', marginBottom: '16px' }}>
          {displayName} · {countryVal} {degreeVal} · {universityVal} · {intakeVal}
        </div>

        {/* Alert */}
        <div className="m-alert ma-warn">
          <span style={{ fontSize: '13px', flexShrink: 0 }}>⚡</span>
          <div>
            <strong>Policy Alert</strong>
            H-1B wage-based selection active. Your odds: 48%. <span style={{ color: 'var(--amber)', fontWeight: '600' }}>Review →</span>
          </div>
        </div>

        {/* ROI Card */}
        <div style={{ background: 'var(--n2)', borderRadius: '16px', padding: '18px', marginBottom: '12px', border: '1px solid rgba(0,201,167,0.18)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
            <svg viewBox="0 0 100 100" width="80" height="80" className="roi-ring-svg">
              <circle cx="50" cy="50" r="42" fill="none" className="roi-ring-bg" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="42" fill="none" stroke="url(#dmg)" strokeWidth="8" 
                strokeDasharray="264" 
                strokeDashoffset={strokeDashoffset} 
                strokeLinecap="round" 
                transform="rotate(-90 50 50)"
                className="roi-ring-fill"
              />
              <defs>
                <linearGradient id="dmg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00C9A7" />
                  <stop offset="100%" stopColor="#4FC3F7" />
                </linearGradient>
              </defs>
              <text x="50" y="46" textAnchor="middle" fontFamily="Syne" fontSize="20" fontWeight="800" fill="white">{score}</text>
              <text x="50" y="58" textAnchor="middle" fontFamily="DM Mono" fontSize="8" fill="rgba(255,255,255,0.3)">/100</text>
            </svg>
            <div>
              <div style={{ fontSize: '10px', fontFamily: 'var(--fm)', color: 'var(--hint)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '3px' }}>ROI Score</div>
              <div style={{ fontFamily: 'var(--fd)', fontSize: '22px', fontWeight: '800', color: 'var(--teal)' }}>{scoreLabel}</div>
              <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>Top 35% of {countryVal}/{degreeVal} profiles</div>
              <span className="m-badge mb-teal" style={{ marginTop: '5px' }}>Payback {roiResult?.breakEvenYear || 3.2} yrs</span>
            </div>
          </div>

          <div className="m-stats-grid">
            <div className="m-stat-box">
              <div className="m-stat-lbl">Total Cost</div>
              <div className="m-stat-val">${(roiResult?.totalInvestment || 158000).toLocaleString()}</div>
            </div>
            <div className="m-stat-box m-stat-box-teal">
              <div className="m-stat-lbl" style={{ color: 'var(--teal)' }}>OPT Salary</div>
              <div className="m-stat-val" style={{ color: 'var(--teal)' }}>${(roiResult?.optSalary || 118000).toLocaleString()}</div>
            </div>
            <div className="m-stat-box m-stat-box-amber">
              <div className="m-stat-lbl" style={{ color: 'var(--amber)' }}>H-1B Odds</div>
              <div className="m-stat-val" style={{ color: 'var(--amber)' }}>48%</div>
            </div>
          </div>
        </div>

        {/* Country preview */}
        <div className="m-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div className="m-section" style={{ margin: 0 }}>Country ROI</div>
            <span style={{ fontSize: '11px', color: 'var(--teal)', cursor: 'pointer' }}>See all →</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', width: '20px' }}>🇺🇸</span>
              <span style={{ flex: 1, fontSize: '12px', color: 'var(--white)' }}>United States</span>
              <div style={{ width: '80px' }}>
                <div className="m-prog-track">
                  <div className="m-prog-fill" style={{ width: '75%', background: 'var(--teal)', height: '5px' }}></div>
                </div>
              </div>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--teal)', width: '22px', textAlign: 'right' }}>75</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', width: '20px' }}>🇩🇪</span>
              <span style={{ flex: 1, fontSize: '12px', color: 'var(--muted)' }}>Germany</span>
              <div style={{ width: '80px' }}>
                <div className="m-prog-track">
                  <div className="m-prog-fill" style={{ width: '70%', background: 'var(--sky)', height: '5px' }}></div>
                </div>
              </div>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--sky)', width: '22px', textAlign: 'right' }}>70</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '14px', width: '20px' }}>🇨🇦</span>
              <span style={{ flex: 1, fontSize: '12px', color: 'var(--muted)' }}>Canada</span>
              <div style={{ width: '80px' }}>
                <div className="m-prog-track">
                  <div className="m-prog-fill" style={{ width: '66%', background: 'var(--sky)', height: '5px' }}></div>
                </div>
              </div>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--sky)', width: '22px', textAlign: 'right' }}>66</span>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="m-section">Quick Actions</div>
        <div className="m-actions-grid">
          <button className="m-action-btn" onClick={() => {}}>🧮 ROI Calc</button>
          <button className="m-action-btn" onClick={() => {}}>✈️ Visa Model</button>
          <button className="m-action-btn" onClick={() => {}}>💰 Loan Sim</button>
          <button className="m-action-btn" onClick={() => {}}>🔮 What-If</button>
        </div>

        <div style={{ height: '24px' }} />
        
        <button className="btn btn-primary btn-full" onClick={handleRecalculate}>
          {isLoading ? 'Recalculating...' : 'Refresh ROI Score'}
        </button>

      </div>
      <BottomNav activeTab="dashboard" />
    </div>
  );
};

export default DashboardMobile;
