import React, { useState, useEffect } from 'react';
import { 
  PiggyBank, 
  TrendingDown, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  ChevronRight,
  TrendingUp,
  DollarSign,
  Calendar
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import loanService from '../../services/loanService';

// Components
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import StatCard from '../../components/StatCard/StatCard';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import BottomNav from '../../components/BottomNav/BottomNav';

import './LoanSimulator.css';

const LoanSimulator = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('loan');
  const [isLoading, setIsLoading] = useState(false);
  
  // State for multiple loan comparison
  const [loans, setLoans] = useState([
    {
      id: 1,
      type: 'Federal Unsubsidized',
      principal: 20500,
      savings: 0,
      rate: 7.9,
      tenure: 10,
      grace: 6,
      isCapitalized: true,
      result: null
    },
    {
      id: 2,
      type: 'International Private',
      principal: 45000,
      savings: 0,
      rate: 11.5,
      tenure: 10,
      grace: 24,
      isCapitalized: true,
      result: null
    }
  ]);

  const [amortizationData, setAmortizationData] = useState([]);

  // Calculate comparisons
  const runSimulation = async () => {
    if (!profile) return;
    setIsLoading(true);
    try {
      // Total degree cost for gap detection (e.g. 2 years * (tuition + living))
      const totalCost = (profile.annualTuition + profile.annualLivingCost) * (profile.programDurationYears || 2);

      const updatedLoans = await Promise.all(loans.map(async (loan) => {
        // Calculate the true net loan after personal savings
        const netPrincipal = Math.max(0, loan.principal - (loan.savings || 0));
        
        // Federal Unsubsidized Cap Enforcement Rule (LN-01 Test Case)
        let gapAmount = 0;
        let effectivePrincipal = netPrincipal;
        if (loan.type.toLowerCase().includes('federal') && netPrincipal > 20500) {
          gapAmount = netPrincipal - 20500;
          effectivePrincipal = 20500; // Cap it for the backend simulation
        }

        const res = await loanService.calculateLoan({
          principal: effectivePrincipal,
          annualInterestRate: loan.rate,
          tenureYears: loan.tenure,
          gracePeriodMonths: loan.grace,
          isInterestCapitalized: loan.isCapitalized,
          totalEstimatedCost: totalCost
        });
        
        return { 
          ...loan, 
          result: { 
            ...res, 
            netPrincipal,
            gapAmount
          } 
        };
      }));
      setLoans(updatedLoans);
      
      // Map the backend amortization schedule for the first loan to the chart
      if (updatedLoans[0]?.result?.amortizationSchedule) {
        const chartData = updatedLoans[0].result.amortizationSchedule.map(point => ({
          name: `Month ${point.month}`,
          principal: point.principalPaid,
          interest: point.interestPaid,
          balance: point.remainingBalance
        }));
        setAmortizationData(chartData);
      }
    } catch (err) {
      console.error("Simulation failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [profile]);

  const updateLoan = (id, field, value) => {
    setLoans(loans.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const addNewLoan = () => {
    if (loans.length < 3) {
      setLoans([...loans, {
        id: Date.now(),
        type: 'New Loan',
        principal: 25000,
        savings: 0,
        rate: 8.5,
        tenure: 10,
        grace: 6,
        isCapitalized: true,
        result: null
      }]);
    }
  };

  const removeLoan = (id) => {
    if (loans.length > 1) {
      setLoans(loans.filter(l => l.id !== id));
    }
  };

  // DTI Calculation Logic
  const calculateDTI = (monthlyEMI) => {
    const projectedMonthlyIncome = (profile?.targetSalary || 120000) / 12;
    return (monthlyEMI / projectedMonthlyIncome) * 100;
  };

  return (
    <div className="shell">
      <Sidebar activeTab="loan" onTabChange={(id) => setActiveTab(id)} profile={profile} userName={profile?.displayName || user?.email?.split('@')[0] || 'Student'} />
      
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
               {loans.map((loan, idx) => {
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
                         <div style={{ fontSize: '10px', color: 'var(--hint)', marginTop: '4px', paddingLeft: '22px' }}>
                           {loan.isCapitalized ? "Add accrued interest to principal after grace." : "Pay interest monthly during study period."}
                         </div>
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

                      <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {loan.result?.gapAmount > 0 && (
                            <div style={{ background: 'rgba(244,168,50,0.1)', border: '1px solid var(--amber)', borderRadius: '6px', padding: '10px', fontSize: '11px', color: 'var(--amber)' }}>
                               <strong>Federal Cap Exceeded</strong><br/>
                               Gap of ${loan.result.gapAmount.toLocaleString()} detected. You must seek Private or Grad PLUS lender.
                            </div>
                          )}
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            {dti > 20 ? (
                               <span className="badge b-coral">High Risk DTI ({dti.toFixed(1)}%)</span>
                            ) : loan.result?.netPrincipal === 0 ? (
                               <span className="badge b-teal">No Loan Needed</span>
                            ) : (
                               <span className="badge b-teal">Sustainable DTI</span>
                            )}
                          </div>
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

export default LoanSimulator;
