import React from 'react';
import BottomNav from '../../../components/BottomNav/BottomNav';

const FundingMobile = ({ sources, calculator, onFinish }) => {
  return (
    <div className="sw-dashboard-mobile" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 80px' }}>
        
        <header className="research-header">
          <div className="rh-eyebrow">Phase 7: Funding</div>
          <h1 className="rh-title" style={{ fontSize: '20px' }}>Capital Strategy</h1>
          <p className="rh-desc" style={{ fontSize: '11px' }}>
            Choose how to finance your investment.
          </p>
        </header>

        {/* EMI Calc Card */}
        <div className="card card-purple" style={{ marginBottom: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>Est. Monthly EMI</div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: 'white' }}>${calculator.emi.toLocaleString()}</div>
            <div style={{ fontSize: '10px', color: 'var(--teal)', marginTop: '4px' }}>Repay Tenure: {calculator.tenureYears}y</div>
          </div>
          
          <div className="divider" style={{ margin: '12px 0' }} />
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--hint)' }}>
              <span>Loan: ${calculator.loanAmount.toLocaleString()}</span>
              <span>Rate: {calculator.interestRate}%</span>
            </div>
            <input 
              type="range" min="20000" max="150000" step="5000" 
              value={calculator.loanAmount} 
              onChange={(e) => calculator.setLoanAmount(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--teal)', marginTop: '8px' }} 
            />
          </div>
        </div>

        {/* Sources List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {sources.map(s => (
            <div key={s.type} className="card">
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                 <span style={{ fontSize: '12px', fontWeight: '700' }}>{s.type}</span>
                 <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--teal)' }}>{s.rate}</span>
               </div>
               <div style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '10px' }}>{s.lenders}</div>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <div style={{ fontSize: '9px' }}>✅ <span style={{ color: 'var(--hint)' }}>{s.pros}</span></div>
                 <div style={{ fontSize: '9px' }}>⚠️ <span style={{ color: 'var(--hint)' }}>{s.cons}</span></div>
               </div>
            </div>
          ))}
        </div>

        <button 
          className="btn btn-primary btn-full"
          style={{ marginTop: '24px' }}
          onClick={onFinish}
        >
          Finish Research
        </button>

      </div>
      
      <BottomNav activeTab="explore" />
    </div>
  );
};

export default FundingMobile;
