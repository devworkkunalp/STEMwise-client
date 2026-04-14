import React from 'react';
import './WhatIfMobile.css';
import { 
  ArrowLeft, 
  ArrowRight,
  TrendingDown, 
  DollarSign, 
  Clock, 
  Zap, 
  Pause,
  Ban
} from 'lucide-react';
import BottomNav from '../../../components/BottomNav/BottomNav';

const WhatIfMobile = ({ 
  baseROI,
  selectedScenario, 
  modeledResult, 
  scenarioCards, 
  selectScenario, 
  saveScenarioResult 
}) => {
  const currentBaseRoi = Math.round(baseROI?.roiScore || baseROI?.roiPercentage || 75);

  // Dynamic impact labels instead of hardcoded numbers
  const getRiskLevel = (id) => {
    switch (id) {
      case 'H1B_DENIED': return { label: 'CRITICAL', color: 'coral' };
      case 'RECESSION': return { label: 'HIGH RISK', color: 'coral' };
      case 'STUDY_DELAY': return { label: 'MODERATE', color: 'amber' };
      case 'JOB_GAP': return { label: 'STRESS', color: 'amber' };
      case 'CURRENCY_CRASH': return { label: 'MONETARY', color: 'sky' };
      case 'LEVEL_3_PROMO': return { label: 'UPSIDE', color: 'teal' };
      default: return { label: 'MODEL', color: 'hint' };
    }
  };

  return (
    <div className="sw-whatif-mobile">
      {/* Header */}
      <div className="m-wi-header">
         <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ArrowLeft size={18} onClick={() => window.history.back()} style={{ cursor: 'pointer' }} />
            <div style={{ fontFamily: 'var(--fd)', fontSize: '18px', fontWeight: '800' }}>What-If Engine</div>
         </div>
         <div className="m-wi-header-hint">Base ROI: <span style={{ color: 'var(--teal)' }}>{currentBaseRoi}</span></div>
      </div>

      <div className="m-container" style={{ flex: 1, overflowY: 'auto' }}>
        <div className="m-wi-intro">Tap a scenario to stress-test your plan</div>

        {/* Vertical Scenario Stack */}
        <div className="m-scenario-list">
           {scenarioCards.map((s) => {
             const risk = getRiskLevel(s.id);
             const isActive = selectedScenario?.id === s.id;
             
             return (
               <div 
                 key={s.id} 
                 className={`m-scenario-card ${isActive ? 'active' : ''}`}
                 onClick={() => selectScenario(s)}
               >
                  <div className="m-scenario-header">
                     <s.icon size={18} className={`text-${s.color}`} />
                     <div className="m-scenario-title">{s.title}</div>
                  </div>
                  <div className="m-scenario-description">{s.description}</div>
                  
                  <div className="m-scenario-footer">
                     <div className={`m-risk-label text-${risk.color}`}>
                        {risk.label}
                     </div>
                     <div style={{ opacity: 0.2 }}>·</div>
                     <div className="m-payback-val">Interactive Modeling Available</div>
                  </div>
               </div>
             );
           })}
        </div>

        <div style={{ height: '60px' }}></div>
      </div>

      {/* Impact Overlay (Bottom View) */}
      {selectedScenario && modeledResult && (
        <div className="m-impact-overlay">
           <div className="m-impact-title">{selectedScenario.title.replace('(3x)', 'Scenario Impact')}</div>

           <div className="m-comparison-row">
              <div className="m-comp-box">
                 <div className="m-comp-label">BASE ROI</div>
                 <div className="m-comp-num teal">{currentBaseRoi}</div>
              </div>

              <div className="m-comp-arrow-col">
                 <div className={`m-delta-badge ${modeledResult.impactScore < 0 ? 'coral' : 'teal'}`}>
                    {modeledResult.impactScore > 0 ? '+' : ''}{Math.round(modeledResult.impactScore)} PTS
                 </div>
                 <ArrowRight size={24} strokeWidth={2.5} />
              </div>

              <div className="m-comp-box">
                 <div className="m-comp-label">ADJ. SCORE</div>
                 <div className="m-comp-num orange">{Math.round(modeledResult.adjustedRoi)}</div>
              </div>
           </div>

           <button 
             className="btn btn-primary btn-full" 
             style={{ marginTop: '24px' }}
             onClick={saveScenarioResult}
           >
              Save Event Model
           </button>
           
           <div 
             style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--hint)', cursor: 'pointer', fontWeight: '600' }}
             onClick={() => selectScenario(null)}
           >
              Dismiss
           </div>
        </div>
      )}

      <BottomNav activeTab="scenarios" />
    </div>
  );
};

export default WhatIfMobile;
