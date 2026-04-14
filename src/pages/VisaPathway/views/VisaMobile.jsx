import React from 'react';
import './VisaMobile.css';
import { ArrowLeft } from 'lucide-react';
import BottomNav from '../../../components/BottomNav/BottomNav';

const VisaMobile = ({ 
  profile, 
  visaData,
  displayWageLevels,
  employers 
}) => {
  // Hardcoded timeline to match the exact requirement in the screenshot for "Your Immigration Chain"
  const immigrationChain = [
    { id: 1, title: 'F-1 Student Visa', meta: '2 years · Active · Fall 2026', badge: 'Active', color: 'teal' },
    { id: 2, title: 'OPT — 12 Months', meta: '$98K–$118K avg · Loan repayment begins', color: 'blue' },
    { id: 3, title: 'STEM OPT +24 Months', meta: '3x H-1B lottery entries ✓', color: 'sky' },
    { id: 4, title: 'H-1B Decision', meta: 'Wage-based Feb 2026', color: 'amber-dash' }
  ];

  const wageLevels = displayWageLevels || [
    { level: 'Level I', rate: 15, range: '<$95K', color: '#ff6b6b' },
    { level: 'Level II', rate: 48, range: 'You', color: '#00c9a7' },
    { level: 'Level III', rate: 61, range: '$125K+', color: '#4fc3f7' },
    { level: 'Level IV', rate: 78, range: '$155K+', color: '#f4a832' }
  ];

  const topSponsors = employers?.length > 0 ? employers.slice(0, 3) : [
    { name: 'Google', lcas: '8.9K', avg: '$185K' },
    { name: 'Amazon', lcas: '15.5K', avg: '$157K' },
    { name: 'Microsoft', lcas: '7.2K', avg: '$175K' }
  ];

  return (
    <div className="sw-visa-mobile">
      {/* Header */}
      <div className="m-visa-header">
        <div className="m-visa-header-title">
           <ArrowLeft size={18} onClick={() => window.history.back()} style={{ cursor: 'pointer' }} />
           <span>Visa Pathways</span>
        </div>
        <div className="m-visa-header-hint">DOL+USCIS</div>
      </div>

      <div className="m-container" style={{ flex: 1, overflowY: 'auto' }}>
        
        {/* Section 1: Immigration Chain */}
        <div className="m-section-label">Your Immigration Chain</div>
        <div className="m-immi-card">
           {immigrationChain.map((step) => (
             <div key={step.id} className="m-immi-step">
                <div className={`m-step-circle ${step.color}`}>{step.id}</div>
                <div className="m-step-content">
                   <div className="m-step-title">{step.title}</div>
                   <div className="m-step-meta">{step.meta}</div>
                   {step.badge && <div className="m-step-badge">{step.badge}</div>}
                   {step.id === 3 && <div className="m-step-detail" style={{ color: 'var(--teal)' }}>3x H-1B lottery entries ✓</div>}
                </div>
             </div>
           ))}
        </div>

        {/* Section 2: H-1B Lottery Odds */}
        <div className="m-section-label">H-1B Lottery Odds — 2026</div>
        <div className="m-odds-card">
           {wageLevels.map((lvl, idx) => {
             const isUser = lvl.level === 'Level II';
             return (
               <div key={idx} className="m-odds-row">
                  <div className={`m-odds-label ${isUser ? 'user-highlight' : ''}`}>
                    {lvl.level} {lvl.range && <span style={{ opacity: 0.5 }}>{lvl.range === 'You' ? '← You' : lvl.range}</span>}
                  </div>
                  <div className="m-odds-bar-track">
                     <div 
                        className="m-odds-bar-fill" 
                        style={{ 
                          width: `${lvl.rate}%`, 
                          background: isUser ? 'var(--teal)' : lvl.color || 'var(--hint)' 
                        }} 
                     />
                  </div>
                  <div className="m-odds-val" style={{ color: isUser ? 'var(--teal)' : 'var(--white)' }}>
                    {lvl.rate}% {isUser && <span className="m-odds-badge">You</span>}
                  </div>
               </div>
             );
           })}
        </div>

        {/* Section 3: Top Sponsors */}
        <div className="m-section-label">Top H-1B Sponsors</div>
        <div className="m-sponsors-card">
           {topSponsors.map((s, idx) => (
             <div key={idx} className="m-sponsor-item">
                <div className="m-sponsor-name">{s.name || s.employerName}</div>
                <div className="m-sponsor-stats">
                   <div className="m-sponsor-lca">{s.lcas || s.totalLcas || '0'} LCAs</div>
                   <div className="m-sponsor-avg">{s.avg || `$${Math.round(s.averageSalary/1000)}K`} avg</div>
                </div>
             </div>
           ))}
        </div>

        {/* Section 4: If H-1B Denied */}
        <div className="m-section-label" style={{ color: 'var(--amber)' }}>If H-1B Denied</div>
        <div className="m-denied-grid">
           <div className="m-denied-card">
              <div className="m-denied-title">O-1 Visa</div>
              <div className="m-denied-roi">ROI 68</div>
           </div>
           <div className="m-denied-card">
              <div className="m-denied-title">Canada PR</div>
              <div className="m-denied-roi">ROI 61</div>
           </div>
        </div>

        <div style={{ height: '40px' }}></div>
      </div>

      <BottomNav activeTab="visa" />
    </div>
  );
};

export default VisaMobile;
