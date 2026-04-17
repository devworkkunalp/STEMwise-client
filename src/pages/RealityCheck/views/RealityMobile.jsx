import React from 'react';
import BottomNav from '../../../components/BottomNav/BottomNav';

const RealityMobile = ({ scenarios, onContinue, onGoToWhatIf }) => {
  return (
    <div className="sw-dashboard-mobile" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 80px' }}>
        
        <header className="research-header">
          <div className="rh-eyebrow">Phase 5: Risk Assessment</div>
          <h1 className="rh-title" style={{ fontSize: '20px' }}>Real Failure Modes</h1>
          <p className="rh-desc" style={{ fontSize: '11px' }}>
            Understanding the risks that break a USD repayment journey.
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {scenarios.map(s => (
            <div key={s.id} className="card" style={{ borderLeft: `3px solid ${s.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: s.color }}>{s.impact}</span>
              </div>
              <h3 style={{ fontSize: '15px', color: 'var(--white)', marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: '1.5' }}>{s.desc}</p>
              
              <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '4px' }}>
                <div style={{ fontSize: '9px', color: 'var(--white)', fontWeight: '600' }}>STAT: {s.stat}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: '16px', background: 'rgba(147, 51, 234, 0.05)', border: '1px solid rgba(147, 51, 234, 0.3)' }} onClick={onGoToWhatIf}>
           <div style={{ fontSize: '12px', color: 'var(--white)', fontWeight: '600' }}>Test My Risk Portfolio</div>
           <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '4px' }}>Open What-If Engine →</div>
        </div>

        <button 
          className="btn btn-primary btn-full"
          style={{ marginTop: '24px' }}
          onClick={onContinue}
        >
          Step 5: Total Cost Builder
        </button>

      </div>
      
      <BottomNav activeTab="explore" />
    </div>
  );
};

export default RealityMobile;
