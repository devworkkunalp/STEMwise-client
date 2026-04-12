import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  ChevronRight, 
  Info, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  PieChart, 
  ShieldCheck, 
  DollarSign, 
  Zap,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import calculationService from '../../services/calculationService';
import scenarioService from '../../services/scenarioService';

// Components
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import StatCard from '../../components/StatCard/StatCard';
import ROIScoreRing from '../../components/ROIScoreRing/ROIScoreRing';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import AlertBanner from '../../components/AlertBanner/AlertBanner';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import RangeSlider from '../../components/RangeSlider/RangeSlider';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import TimelineStep from '../../components/TimelineStep/TimelineStep';
import RepaymentChart from '../../components/Charts/RepaymentChart';
import BottomNav from '../../components/BottomNav/BottomNav';

import './Dashboard.css';


const Dashboard = () => {
  const { user, profile, refreshProfile, isAuthenticated, authError, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [roiResult, setRoiResult] = useState(null);
  const [loanValue, setLoanValue] = useState(45000);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [history, setHistory] = useState([]);

  // Greeting Logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const result = await calculationService.calculateROI({
          AnnualTuition: profile?.annualTuition || 45000,
          AnnualLivingCost: profile?.annualLivingCost || 18000,
          DurationYears: profile?.programDuration || 2,
          FinalSalaryBenchmark: profile?.targetSalary || 115000,
          CurrentSalary: profile?.currentSalary || 15000,
          HomeCurrency: profile?.nationality === 'India' ? 'INR' : 'USD',
          StudyCurrency: 'USD',
          TaxRate: 0.25
        });
        setRoiResult(result);
        
        // Fetch recent scenarios
        const histData = await scenarioService.getHistory();
        setHistory(histData?.slice(0, 3) || []);
        
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Dashboard data fetch failed", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && profile) {
      fetchDashboardData();
    }
  }, [isAuthenticated, profile]);

  const handleRecalculate = async () => {
    setIsLoading(true);
    try {
      const result = await calculationService.calculateROI({
        loanAmount: loanValue,
        degreeType: profile?.degreeLevel === 1 ? 'MS CS' : 'PhD',
        country: profile?.nationality || 'USA'
      });
      setRoiResult(result);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Recalculation failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  // T11.5: Vertical Visa Pathway Steps
  const visaSteps = [
    { id: 1, title: 'F-1 Student Visa', status: 'Completed', duration: '2 Years', description: 'Maintain full-time enrollment and valid I-20.' },
    { id: 2, title: 'OPT / STEM Extension', status: 'Active', duration: '3 Years', description: 'Work authorization for STEM graduates.' },
    { id: 3, title: 'H-1B Lottery', status: 'Pending', duration: 'Variable', description: 'Employer-sponsored work visa lottery.', risk: 'Wage-based selection' },
    { id: 4, title: 'I-140 Greencard', status: 'Pending', duration: '5-10 Years', description: 'Permanent residency application.' },
  ];

  const displayName = profile?.displayName || user?.email?.split('@')[0] || 'Student';

  // Error Recovery UI
  if (authError && !profile) {
    return (
      <div className="flex-center h-screen flex-column p-4 text-center sw-app-root">
        <ShieldAlert size={48} className="text-coral mb-4" />
        <h2 className="title-gradient">Connection Issue</h2>
        <p className="text-secondary mb-6 max-width-400">
          We couldn't retrieve your profile data. The server might be busy.
        </p>
        <Button variant="primary" onClick={() => refreshProfile(user?.id, true)}>
          Retry Loading Profile
        </Button>
      </div>
    );
  }

  if (loading && !profile) return <LoadingSpinner fullPage message="Securely retrieving your STEM engine..." />;

  return (
    <div className="shell">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        userName={displayName}
        profile={profile}
      />

      <div className="main">
        <div id="pg-dashboard" className="page active" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="topbar">
            <div>
              <div className="tb-breadcrumb">DASHBOARD</div>
              <div className="tb-title">Your STEM Analytics</div>
            </div>
            <div className="tb-right">
              <div style={{ fontSize: '11px', color: 'var(--hint)', fontFamily: 'var(--fm)' }}>
                Data live as of {lastUpdated}
              </div>
              <button className="btn btn-primary" onClick={handleRecalculate}>
                {isLoading ? 'Syncing...' : 'Live ROI Sync'}
              </button>
            </div>
          </div>

          <div className="pbody">
            
            {/* Greeting */}
            <div className="section-title" style={{ fontSize: '20px', marginBottom: '24px' }}>
              {getGreeting()}, {displayName} 👋
            </div>

            {/* Policy Alert Banner */}
            <div className="alert a-warn">
              <span>⚠️</span>
              <div>
                <strong>Policy Update: H-1B Wage-Based Selection</strong>
                The DHS has proposed a resume of wage-based prioritization for the March 2026 lottery. Low-wage positions may see significantly reduced selection rates. <a href="#" style={{ textDecoration: 'underline' }}>Analyze your risk →</a>
              </div>
            </div>

            {/* Main Stats Grid */}
            <div className="g-3070" style={{ marginBottom: '16px' }}>
              
              {/* ROI Score Card */}
              <div className="card card-teal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '30px 20px' }}>
                <div className="eyebrow" style={{ color: 'var(--teal)' }}>10-Yr ROI Score</div>
                <div style={{ fontSize: '56px', fontWeight: '800', fontFamily: 'var(--fd)', color: 'var(--white)', lineHeight: '1', margin: '14px 0' }}>
                  {roiResult?.roiPercentage || 72}
                </div>
                <span className="badge b-teal">Top 15% for {profile?.nationality || 'India'}</span>
              </div>

              {/* StatCards Cluster */}
              <div className="g2">
                <div className="card">
                  <div className="flex-between">
                    <span className="eyebrow">Net Lifetime Value</span>
                    <TrendingUp size={14} className="text-teal" />
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--fd)', marginTop: '8px' }}>
                    {roiResult?.netEarnings10Yr ? `$${roiResult.netEarnings10Yr.toLocaleString()}` : "$--"}
                  </div>
                  <div className="label" style={{ marginTop: '4px' }}>10-Year ROI Potential</div>
                </div>

                <div className="card">
                  <div className="flex-between">
                    <span className="eyebrow">Projected Repayment</span>
                    <Clock size={14} className="text-amber" />
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--fd)', marginTop: '8px' }}>
                    {roiResult?.breakEvenYear ? `${roiResult.breakEvenYear} Yrs` : "2.4 Yrs"}
                  </div>
                  <div className="label" style={{ marginTop: '4px' }}>Debt-Free Milestone</div>
                </div>

                <div className="card">
                  <div className="flex-between">
                    <span className="eyebrow">MS Quota</span>
                    <PieChart size={14} className="text-coral" />
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--fd)', marginTop: '8px' }}>
                    28.4%
                  </div>
                  <div className="label" style={{ marginTop: '4px' }}>H-1B Chance ({profile?.nationality || 'Intl'})</div>
                </div>

                <div className="card">
                  <div className="flex-between">
                    <span className="eyebrow">Home Currency FX</span>
                    <DollarSign size={14} className="text-sky" />
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--fd)', marginTop: '8px' }}>
                    {roiResult?.totalInvestment ? `$${roiResult.totalInvestment.toLocaleString()}` : "$--"}
                  </div>
                  <div className="label" style={{ marginTop: '4px' }}>Total Cost Estimate</div>
                </div>
              </div>
            </div>

            <div className="g2">
              {/* Repayment Chart */}
              <div className="card">
                <div className="section-title">Repayment Timeline</div>
                <div className="label" style={{ marginBottom: '16px' }}>Cumulative net worth progression based on median STEM salaries.</div>
                <div style={{ height: '260px' }}>
                  <RepaymentChart />
                </div>
              </div>

              {/* Sandbox Model */}
              <div className="card">
                <div className="section-title">ROI Sandbox Modeling</div>
                <div className="label" style={{ marginBottom: '16px' }}>Model adjustments to your loan to see immediate ROI impact.</div>
                
                <div className="input-group">
                  <label className="input-label">Adjust Loan Amount</label>
                  <div className="slider-val">${loanValue.toLocaleString()}</div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="150000" 
                    step="5000"
                    value={loanValue}
                    onChange={(e) => setLoanValue(parseInt(e.target.value))}
                  />
                  <div className="slider-labels"><span>$10K</span><span>$150K</span></div>
                </div>

                <button className="btn btn-primary btn-full" onClick={handleRecalculate} style={{ marginTop: '16px' }}>
                  {isLoading ? 'Analyzing Impact...' : 'Run Scenario'}
                </button>
              </div>
            </div>

            {/* Recent Scenarios History */}
            <div className="section" style={{ marginTop: '32px' }}>
               <div className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} className="text-amber" /> Recent Performance Models
               </div>
               <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                  <table className="ctable">
                     <thead>
                        <tr>
                           <th>Scenario</th>
                           <th>Impact Score</th>
                           <th>Adjusted ROI</th>
                           <th>Date Generated</th>
                        </tr>
                     </thead>
                     <tbody>
                        {history.length === 0 ? (
                           <tr>
                              <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: 'var(--hint)' }}>
                                 No history found. Try saving a simulation in the What-If Engine.
                              </td>
                           </tr>
                        ) : (
                           history.map((h) => {
                              const type = h.scenarioType ?? h.ScenarioType;
                              const impact = h.impactScore ?? h.ImpactScore ?? 0;
                              const roi = h.adjustedRoi ?? h.AdjustedRoi ?? 0;
                              const rawDate = h.createdAt ?? h.CreatedAt ?? h.date ?? h.Date;
                              const id = h.id ?? h.Id;

                              return (
                                 <tr key={id}>
                                    <td className="hl">{type?.replace('_', ' ') || 'Event Simulation'}</td>
                                    <td>
                                       <span className={`badge ${impact < 0 ? 'b-coral' : 'b-teal'}`}>
                                          {impact > 0 ? '+' : ''}{Math.round(impact)} PTS
                                       </span>
                                    </td>
                                    <td style={{ fontFamily: 'var(--fm)', fontWeight: '600' }}>{Math.round(roi)}</td>
                                    <td style={{ fontSize: '11px' }}>{rawDate ? new Date(rawDate).toLocaleDateString() : 'N/A'}</td>
                                 </tr>
                              );
                           })
                        )}
                     </tbody>
                  </table>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
