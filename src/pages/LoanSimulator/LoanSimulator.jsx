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
      type: 'Federal Grad PLUS',
      principal: 20500,
      rate: 7.9,
      tenure: 10,
      grace: 6,
      result: null
    },
    {
      id: 2,
      type: 'International Private',
      principal: 45000,
      rate: 11.5,
      tenure: 10,
      grace: 24,
      result: null
    }
  ]);

  const [amortizationData, setAmortizationData] = useState([]);

  // Calculate comparisons
  const runSimulation = async () => {
    setIsLoading(true);
    try {
      const updatedLoans = await Promise.all(loans.map(async (loan) => {
        const res = await loanService.calculateLoan({
          principal: loan.principal,
          interestRate: loan.rate,
          termYears: loan.tenure,
          gracePeriodMonths: loan.grace
        });
        return { ...loan, result: res };
      }));
      setLoans(updatedLoans);
      
      // Generate chart data for the first loan (example)
      if (updatedLoans[0]?.result) {
        generateChartData(updatedLoans[0]);
      }
    } catch (err) {
      console.error("Simulation failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateChartData = (loan) => {
    const data = [];
    const monthlyEMI = loan.result.monthlyEMI;
    let balance = parseFloat(loan.principal);
    const monthlyRate = (loan.rate / (12 * 100));

    // Simple amortization visualization for the chart
    for (let i = 1; i <= loan.tenure * 12; i += 6) { // Sample every 6 months
      const interest = balance * monthlyRate;
      const principalPaid = monthlyEMI - interest;
      balance = Math.max(0, balance - principalPaid);
      
      data.push({
        name: `Month ${i}`,
        principal: Math.round(principalPaid * 6),
        interest: Math.round(interest * 6),
        balance: Math.round(balance)
      });
    }
    setAmortizationData(data);
  };

  useEffect(() => {
    runSimulation();
  }, []);

  const updateLoan = (id, field, value) => {
    setLoans(loans.map(l => l.id === id ? { ...l, [field]: value } : l));
  };

  const addNewLoan = () => {
    if (loans.length < 3) {
      setLoans([...loans, {
        id: Date.now(),
        type: 'New Loan',
        principal: 25000,
        rate: 8.5,
        tenure: 10,
        grace: 6,
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
    <div className="sw-app-root">
      <Navbar isAuthenticated={true} user={user} />
      
      <div className="loan-page-root">
        <Sidebar activeTab="loan" onTabChange={(id) => setActiveTab(id)} profile={profile} />
        
        <main className="loan-main">
          <div className="loan-content animate-fade-in">
            
            <header className="loan-header">
              <div className="loan-header-info">
                 <Badge variant="amber">Financial Planner</Badge>
                 <h1 className="text-gradient">Loan Simulator</h1>
                 <p className="text-secondary">Compare interest rates and repayment timelines for your STEM degree.</p>
              </div>
              <div className="header-actions">
                 <Button variant="primary" icon={TrendingDown} onClick={runSimulation} isLoading={isLoading}>
                    Recalculate All
                 </Button>
              </div>
            </header>

            {/* US Federal Cap Banner */}
            {profile?.destinationCountry === 'US' && (
              <div className="federal-cap-banner animate-slide-up">
                <AlertTriangle size={18} className="text-amber" />
                <div className="banner-text">
                  <strong>Important Notice:</strong> Graduate loans are capped at $20,500/year for Federal Direct Unsubsidized loans. Additional funding may require Grad PLUS or Private lenders.
                </div>
              </div>
            )}

            {/* Loan Card Grid */}
            <section className="loan-simulator-grid">
               {loans.map((loan, idx) => {
                 const dti = loan.result ? calculateDTI(loan.result.monthlyEMI) : 0;
                 return (
                   <div key={loan.id} className="glass-panel loan-card animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                      <div className="loan-card-header">
                         <div className="flex-between">
                            <InputField 
                              className="loan-type-input"
                              value={loan.type} 
                              onChange={(e) => updateLoan(loan.id, 'type', e.target.value)}
                              placeholder="Loan Label"
                            />
                            <button className="remove-loan-btn" onClick={() => removeLoan(loan.id)}><Trash2 size={14} /></button>
                         </div>
                      </div>

                      <div className="loan-card-body">
                         <div className="input-group">
                           <InputField 
                              label="Principal Amount"
                              type="number"
                              value={loan.principal}
                              onChange={(e) => updateLoan(loan.id, 'principal', parseInt(e.target.value))}
                              prefix="$"
                           />
                           <InputField 
                              label="Interest Rate"
                              type="number"
                              step="0.1"
                              value={loan.rate}
                              onChange={(e) => updateLoan(loan.id, 'rate', parseFloat(e.target.value))}
                              suffix="%"
                           />
                         </div>
                         <div className="input-group">
                           <InputField 
                              label="Tenure (Yrs)"
                              type="number"
                              value={loan.tenure}
                              onChange={(e) => updateLoan(loan.id, 'tenure', parseInt(e.target.value))}
                           />
                           <InputField 
                              label="Grace (Mo)"
                              type="number"
                              value={loan.grace}
                              onChange={(e) => updateLoan(loan.id, 'grace', parseInt(e.target.value))}
                           />
                         </div>
                      </div>

                      <div className="loan-card-results">
                         <div className="result-metric">
                            <span className="metric-label">Monthly EMI</span>
                            <span className="metric-value">${loan.result?.monthlyEMI.toLocaleString() || '---'}</span>
                         </div>
                         
                         <div className="dti-indicator-row">
                            <div className="flex-between">
                               <span className="metric-sub">DTI Ratio</span>
                               <span className={`dti-value ${dti > 20 ? 'text-coral' : 'text-teal'}`}>{dti.toFixed(1)}%</span>
                            </div>
                            <div className="dti-bar">
                               <div className="dti-fill" style={{ width: `${Math.min(100, dti * 2.5)}%`, backgroundColor: dti > 20 ? 'var(--color-coral)' : 'var(--color-teal)' }}></div>
                            </div>
                         </div>

                         <div className="total-interest-row">
                            <Info size={14} className="text-secondary" />
                            <span>Total Interest: <strong>${loan.result?.totalInterestPayable.toLocaleString() || '0'}</strong></span>
                         </div>
                      </div>

                      <div className="card-status-footer">
                         {dti > 20 ? (
                            <Badge variant="danger" icon={AlertTriangle}>High Risk DTI</Badge>
                         ) : (
                            <Badge variant="success" icon={CheckCircle2}>Sustainable</Badge>
                         )}
                      </div>
                   </div>
                 );
               })}

               {loans.length < 3 && (
                 <button className="add-loan-card glass-panel flex-center" onClick={addNewLoan}>
                    <Plus size={24} />
                    <span>Add Loan Comparison</span>
                 </button>
               )}
            </section>

            {/* Amortization Chart */}
            <section className="amortization-section glass-panel animate-slide-up">
               <div className="section-title">
                  <TrendingUp size={20} className="text-teal" />
                  <h3>Repayment Breakdown (Loan 1)</h3>
               </div>
               
               <div style={{ height: '400px', marginTop: 'var(--space-8)' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={amortizationData}>
                      <defs>
                        <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-teal)" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="var(--color-teal)" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--color-coral)" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="var(--color-coral)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                      <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                      <YAxis stroke="var(--text-muted)" fontSize={12} tickFormatter={(value) => `$${value}`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--bg-midnight)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)' }}
                        itemStyle={{ color: 'var(--text-primary)' }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="principal" stroke="var(--color-teal)" fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" name="Principal Paid" />
                      <Area type="monotone" dataKey="interest" stroke="var(--color-coral)" fillOpacity={1} fill="url(#colorInterest)" stackId="1" name="Interest Paid" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
            </section>

          </div>
        </main>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      {isLoading && <LoadingSpinner fullPage message="Modeling Amortization Schedules..." />}
    </div>
  );
};

export default LoanSimulator;
