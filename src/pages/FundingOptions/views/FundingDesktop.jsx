import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';

const FundingDesktop = ({ sources, calculator, onFinish }) => {
  return (
    <div className="shell">
      <Sidebar activeTab="funding" />

      <div className="main">
        <div className="pbody">
          <header className="research-header">
            <div className="rh-eyebrow">Phase 7: Capital Strategy</div>
            <h1 className="rh-title">Funding & Loan Comparison</h1>
            <p className="rh-desc">
              Financial engineering for your STEM degree. Compare collateral requirements, 
              processing speeds, and long-term interest burdens.
            </p>
          </header>

          <div className="g-7030">
            {/* Left Column: Source Comparison */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card">
                <div className="section-title">Lender Ecosystem</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {sources.map(s => (
                    <div key={s.type} style={{ padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                         <h4 style={{ fontSize: '15px', color: 'var(--white)' }}>{s.type}</h4>
                         <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--teal)' }}>{s.rate} APR</span>
                       </div>
                       <div style={{ fontSize: '12px', color: 'var(--hint)', marginBottom: '8px' }}>Lenders: {s.lenders}</div>
                       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '12px' }}>
                         <div>
                           <div style={{ fontSize: '9px', color: 'var(--teal)', fontWeight: '700', textTransform: 'uppercase' }}>PROS</div>
                           <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>{s.pros}</div>
                         </div>
                         <div>
                           <div style={{ fontSize: '9px', color: 'var(--coral)', fontWeight: '700', textTransform: 'uppercase' }}>CONS</div>
                           <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>{s.cons}</div>
                         </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Mini Calculator */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card card-purple">
                <div className="section-title">EMI Estimator</div>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '11px', color: 'var(--hint)' }}>Loan Amount (USD)</label>
                  <input 
                    type="range" min="20000" max="150000" step="5000" 
                    value={calculator.loanAmount} 
                    onChange={(e) => calculator.setLoanAmount(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--teal)', margin: '10px 0' }} 
                  />
                  <div style={{ fontSize: '16px', fontWeight: '700', textAlign: 'right' }}>${calculator.loanAmount.toLocaleString()}</div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '11px', color: 'var(--hint)' }}>Tenure: {calculator.tenureYears} Years</label>
                  <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                    {[5, 7, 10, 15].map(t => (
                      <button 
                        key={t}
                        className={`btn btn-sm ${calculator.tenureYears === t ? 'btn-primary' : 'btn-ghost'}`}
                        style={{ flex: 1, fontSize: '10px' }}
                        onClick={() => calculator.setTenureYears(t)}
                      >
                        {t}y
                      </button>
                    ))}
                  </div>
                </div>

                <div className="divider" />

                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                   <div style={{ fontSize: '11px', color: 'var(--hint)' }}>ESTIMATED MONTHLY EMI</div>
                   <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--white)' }}>${calculator.emi.toLocaleString()}</div>
                   <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '4px' }}>Total Repay: ${(calculator.totalRepay/1000).toFixed(0)}k</div>
                </div>
              </div>

              <button 
                className="btn btn-primary btn-full"
                onClick={onFinish}
              >
                Complete Research Hub →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingDesktop;
