import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';

const RealityDesktop = ({ scenarios, onContinue, onGoToWhatIf }) => {
  return (
    <div className="shell">
      <Sidebar activeTab="reality" />

      <div className="main">
        <div className="pbody">
          <header className="research-header">
            <div className="rh-eyebrow">Phase 5: Risk Assessment</div>
            <h1 className="rh-title">The "Aha!" Moment: <em>Real Failure Modes</em></h1>
            <p className="rh-desc">
              Most students plan for the "Happy Path." We plan for reality. 
              Understand how small shifts in timing or policy can fundamentally break a USD loan.
            </p>
          </header>

          <div className="g3">
            {scenarios.map(s => (
              <div key={s.id} className="card" style={{ borderTop: `4px solid ${s.color}`, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--hint)', textTransform: 'uppercase', letterSpacing: '1px' }}>Scenario</div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: s.color }}>{s.impact}</div>
                </div>
                
                <h3 style={{ fontSize: '18px', color: 'var(--white)', marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.6', flex: 1 }}>{s.desc}</p>
                
                <div className="divider" style={{ margin: '20px 0' }} />
                
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--hint)', marginBottom: '4px' }}>REAL WORLD STAT</div>
                  <div style={{ fontSize: '13px', fontWeight: '500', color: 'var(--white)' }}>{s.stat}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card" style={{ marginTop: '24px', background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)', border: '1px solid var(--purple)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '18px', color: 'var(--white)', marginBottom: '4px' }}>Model These Risks Individually</h4>
                <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Use our Professional What-If Engine to see how these scenarios affect YOUR portfolio.</p>
              </div>
              <button className="btn btn-ghost" onClick={onGoToWhatIf}>Open What-If Engine →</button>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <button 
              className="btn btn-primary"
              style={{ padding: '14px 60px' }}
              onClick={onContinue}
            >
              Step 5: Total Cost Builder →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RealityDesktop;
