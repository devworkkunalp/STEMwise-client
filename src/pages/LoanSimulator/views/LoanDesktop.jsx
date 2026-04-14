import React from 'react';
import { 
  Plus, 
  Trash2, 
  AlertTriangle,
  TrendingUp,
  Info
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Sidebar from '../../../components/Sidebar/Sidebar';

const LoanDesktop = ({ 
  profile, 
  user, 
  loans, 
  isLoading, 
  amortizationData, 
  updateLoan, 
  addNewLoan, 
  removeLoan, 
  calculateDTI, 
  runSimulation 
}) => {
  return (
    <div className="shell">
      <Sidebar 
        activeTab="loan" 
        profile={profile} 
        userName={profile?.displayName || user?.email?.split('@')[0] || 'Student'} 
      />
      
      <div className="main">
        <div id="pg-loan" className="page active" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="topbar">
            <div>
              <div className="tb-breadcrumb">FINANCIAL PLANNER</div>
              <div className="tb-title">Loan Simulator</div>
            </div>
            <div className="tb-right">
              <button className="btn btn-primary" onClick={runSimulation} disabled={isLoading}>
                {isLoading ? 'Calculating...' : 'Recalculate All'}
              </button>
            </div>
          </div>

          <div className="pbody">
            
            <div className="section-title" style={{ fontSize: '20px', marginBottom: '20px' }}>
              Compare interest rates and repayment timelines for your STEM degree.
            </div>

            {/* US Federal Cap Banner */}
            {profile?.destinationCountry === 'US' && (
              <div className="alert a-warn" style={{ marginBottom: '24px' }}>
                <span><AlertTriangle size={16} /></span>
                <div>
                  <strong>Important Notice:</strong> Graduate loans are capped at $20,500/year for Federal Direct Unsubsidized loans. Additional funding may require Grad PLUS or Private lenders.
                </div>
              </div>
            )}

            {/* Loan Card Grid */}
            <div className="g3" style={{ marginBottom: '32px' }}>
               {loans.map((loan) => {
                 const dti = loan.result ? calculateDTI(loan.result.monthlyEMI) : 0;
                 return (
                   <div key={loan.id} className="card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                          <input 
                            type="text" 
                            style={{ background: 'transparent', border: 'none', color: 'var(--white)', fontSize: '15px', fontWeight: '700', padding: 0 }}
                            value={loan.type} 
                            onChange={(e) => updateLoan(loan.id, 'type', e.target.value)}
                            placeholder="Loan Label"
                          />
                          <button style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer' }} onClick={() => removeLoan(loan.id)}>
                            <Trash2 size={16} />
                          </button>
                      </div>

                      <div className="g2" style={{ gap: '10px' }}>
                        <div className="input-group">
                           <span className="input-label">Principal Amount</span>
                           <div style={{ position: 'relative' }}>
                             <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--hint)' }}>$</span>
                             <input type="number" style={{ paddingLeft: '24px' }} value={loan.principal} onChange={(e) => updateLoan(loan.id, 'principal', parseInt(e.target.value) || 0)} />
                           </div>
                        </div>
                        <div className="input-group">
                           <span className="input-label">Offset Savings</span>
                           <div style={{ position: 'relative' }}>
                             <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--teal)' }}>$</span>
                             <input type="number" style={{ paddingLeft: '24px', borderColor: 'rgba(0,201,167,0.3)' }} value={loan.savings} onChange={(e) => updateLoan(loan.id, 'savings', parseInt(e.target.value) || 0)} />
                           </div>
                        </div>
                        <div className="input-group">
                           <span className="input-label">Interest Rate</span>
                           <div style={{ position: 'relative' }}>
                             <input type="number" step="0.1" style={{ paddingRight: '24px' }} value={loan.rate} onChange={(e) => updateLoan(loan.id, 'rate', parseFloat(e.target.value) || 0)} />
                             <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--hint)' }}>%</span>
                           </div>
                        </div>
                        <div className="input-group">
                           <span className="input-label">Tenure (Yrs)</span>
                           <input type="number" value={loan.tenure} onChange={(e) => updateLoan(loan.id, 'tenure', parseInt(e.target.value))} />
                        </div>
                        <div className="input-group">
                           <span className="input-label">Grace (Mo)</span>
                           <input type="number" value={loan.grace} onChange={(e) => updateLoan(loan.id, 'grace', parseInt(e.target.value))} />
                        </div>
                      </div>
                      
                      {/* Interest Treatment Toggle */}
                      <div className="input-group" style={{ marginTop: '4px' }}>
                         <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--white)', cursor: 'pointer' }}>
                           <input type="checkbox" checked={loan.isCapitalized} onChange={() => updateLoan(loan.id, 'isCapitalized', !loan.isCapitalized)} />
                           Capitalize Interest
                         </label>
                      </div>

                      <div className="divider"></div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                             <span className="eyebrow" style={{ margin: 0 }}>Monthly EMI</span>
                             <span style={{ fontFamily: 'var(--fd)', fontSize: '18px', fontWeight: '700', color: 'var(--white)' }}>${loan.result?.monthlyEMI.toLocaleString() || '---'}</span>
                          </div>
                          
                          <div>
                             <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                                <span style={{ color: 'var(--muted)' }}>DTI Ratio</span>
                                <span style={{ fontFamily: 'var(--fm)', color: dti > 20 ? 'var(--coral)' : 'var(--teal)' }}>{dti.toFixed(1)}%</span>
                             </div>
                             <div className="prog-track">
                                <div className="prog-fill" style={{ width: `${Math.min(100, dti * 2.5)}%`, background: dti > 20 ? 'var(--coral)' : 'var(--teal)' }}></div>
                             </div>
                          </div>

                          <div style={{ fontSize: '11px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                             <Info size={12} />
                             <span>Total Interest: <strong style={{ color: 'var(--white)' }}>${loan.result?.totalInterestPayable.toLocaleString() || '0'}</strong></span>
                          </div>
                      </div>

                      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                          {dti > 20 ? (
                             <span className="badge b-coral">High Risk DTI ({dti.toFixed(1)}%)</span>
                          ) : loan.result?.netPrincipal === 0 ? (
                             <span className="badge b-teal">No Loan Needed</span>
                          ) : (
                             <span className="badge b-teal">Sustainable DTI</span>
                          )}
                      </div>
                   </div>
                 );
               })}

               {loans.length < 3 && (
                 <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderStyle: 'dashed', cursor: 'pointer', opacity: 0.7 }} onClick={addNewLoan}>
                    <Plus size={24} style={{ marginBottom: '8px' }} />
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>Add Loan Comparison</span>
                 </div>
               )}
            </div>

            {/* Amortization Chart */}
            <div className="card">
               <div className="section-title">
                  <TrendingUp size={16} className="text-teal" style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
                  Repayment Breakdown (Loan 1)
               </div>
               
               <div style={{ height: '350px', marginTop: '16px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={amortizationData}>
                      <defs>
                        <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--teal)" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="var(--teal)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--coral)" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="var(--coral)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" stroke="var(--hint)" fontSize={12} />
                      <YAxis stroke="var(--hint)" fontSize={12} tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--n4)', border: '1px solid var(--bdr)', borderRadius: '8px' }}
                        itemStyle={{ color: 'var(--white)' }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="principal" stroke="var(--teal)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" name="Principal Paid" />
                      <Area type="monotone" dataKey="interest" stroke="var(--coral)" fillOpacity={1} fill="url(#colorInterest)" stackId="1" name="Interest Paid" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDesktop;
