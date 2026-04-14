import React from 'react';
import './LoanMobile.css';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  XAxis, 
  YAxis 
} from 'recharts';
import { 
  Plus, 
  Trash2, 
  RotateCw, 
  Info,
  DollarSign,
  Percent,
  Calendar
} from 'lucide-react';
import BottomNav from '../../../components/BottomNav/BottomNav';

const LoanMobile = ({ 
  profile, 
  loans, 
  amortizationData, 
  calculateDTI,
  updateLoan,
  addNewLoan,
  removeLoan,
  runSimulation,
  isLoading
}) => {
  return (
    <div className="sw-loan-mobile">
      {/* Header */}
      <div className="m-loan-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px', color: 'var(--muted)', cursor: 'pointer' }} onClick={() => window.history.back()}>←</span>
          <div style={{ fontFamily: 'var(--fd)', fontSize: '16px', fontWeight: '700', color: 'var(--white)' }}>Loan Simulator</div>
        </div>
        <button 
          className={`m-recalc-btn ${isLoading ? 'is-loading' : ''}`} 
          onClick={runSimulation}
          disabled={isLoading}
        >
          <RotateCw size={14} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        
        {/* Debt Summary */}
        <div className="m-section-label">Projected Debt Insights</div>
        <div className="alert a-info" style={{ marginBottom: '16px', fontSize: '11px' }}>
           Based on a target salary of <strong>${(profile?.targetSalary || 115000).toLocaleString()}</strong>.
        </div>

        {/* Loan Cards */}
        <div className="m-loan-list">
          {loans.map((loan) => {
            const dti = loan.result ? calculateDTI(loan.result.monthlyEMI) : 0;
            return (
              <div key={loan.id} className="m-loan-card">
                 <div className="m-loan-card-head">
                    <input 
                      className="m-loan-type-input"
                      value={loan.type}
                      onChange={(e) => updateLoan(loan.id, 'type', e.target.value)}
                    />
                    <button className="m-remove-btn" onClick={() => removeLoan(loan.id)}>
                      <Trash2 size={14} />
                    </button>
                 </div>
                 
                 <div className="m-loan-inputs">
                    <div className="m-l-fg">
                       <label className="m-l-lbl"><DollarSign size={10} /> Principal</label>
                       <input 
                         type="number" 
                         className="m-l-input" 
                         value={loan.principal} 
                         onChange={(e) => updateLoan(loan.id, 'principal', parseInt(e.target.value) || 0)}
                       />
                    </div>
                    <div className="m-l-fg">
                       <label className="m-l-lbl"><Percent size={10} /> Rate (%)</label>
                       <input 
                         type="number" 
                         step="0.1"
                         className="m-l-input" 
                         value={loan.rate} 
                         onChange={(e) => updateLoan(loan.id, 'rate', parseFloat(e.target.value) || 0)}
                       />
                    </div>
                    <div className="m-l-fg">
                       <label className="m-l-lbl"><Calendar size={10} /> Tenure (Yr)</label>
                       <input 
                         type="number" 
                         className="m-l-input" 
                         value={loan.tenure} 
                         onChange={(e) => updateLoan(loan.id, 'tenure', parseInt(e.target.value) || 0)}
                       />
                    </div>
                 </div>

                 <div className="m-loan-emi-box">
                    <div className="m-loan-dti-label">ESTIMATED EMI</div>
                    <div className="m-loan-emi-val">${loan.result?.monthlyEMI.toLocaleString() || '---'}</div>
                    
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                         <span style={{ color: 'var(--hint)', fontWeight: '600' }}>DTI RATIO</span>
                         <span style={{ color: dti > 20 ? 'var(--coral)' : 'var(--teal)', fontWeight: '700' }}>{dti.toFixed(1)}%</span>
                      </div>
                      <div className="prog-track" style={{ height: '4px' }}>
                         <div className="prog-fill" style={{ width: `${Math.min(100, dti * 2.5)}%`, background: dti > 20 ? 'var(--coral)' : 'var(--teal)' }}></div>
                      </div>
                    </div>

                    <div className="m-loan-interest-info">
                       <Info size={10} /> Total Interest: <strong>${loan.result?.totalInterestPayable.toLocaleString()}</strong>
                    </div>
                 </div>

                 {loan.result?.gapAmount > 0 && (
                   <div className="m-federal-cap-warn">
                      ⚠️ Federal Cap Exceeded: ${loan.result.gapAmount.toLocaleString()} gap detected.
                   </div>
                 )}

                 {loan.type.toLowerCase().includes('federal') && profile?.nationality !== 'United States' && (
                   <div className="m-federal-cap-warn" style={{ marginTop: '8px', color: 'var(--amber)', background: 'rgba(244, 168, 50, 0.1)' }}>
                      ⚠️ Intl students typically ineligible for Federal loans.
                   </div>
                 )}
              </div>
            );
          })}

          {loans.length < 3 && (
            <button className="m-add-loan-btn" onClick={addNewLoan}>
               <Plus size={18} /> Add Loan Comparison
            </button>
          )}
        </div>

        {/* Repayment Chart */}
        <div className="m-section-label" style={{ marginTop: '24px' }}>Repayment Flow (Loan 1)</div>
        <div className="m-loan-chart-container">
           <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={amortizationData}>
                <XAxis dataKey="name" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Area 
                  type="monotone" 
                  dataKey="principal" 
                  stroke="var(--teal)" 
                  fill="var(--teal)" 
                  fillOpacity={0.1} 
                  stackId="1" 
                />
                <Area 
                  type="monotone" 
                  dataKey="interest" 
                  stroke="var(--coral)" 
                  fill="var(--coral)" 
                  fillOpacity={0.1} 
                  stackId="1" 
                />
              </AreaChart>
           </ResponsiveContainer>
           <div className="m-chart-legend">
              <div className="m-legend-item">
                 <div className="m-leg-dot teal"></div> Principal
              </div>
              <div className="m-legend-item">
                 <div className="m-leg-dot coral"></div> Interest
              </div>
           </div>
        </div>

        <div style={{ height: '60px' }}></div>
      </div>
      <BottomNav activeTab="loan" />
    </div>
  );
};

export default LoanMobile;
