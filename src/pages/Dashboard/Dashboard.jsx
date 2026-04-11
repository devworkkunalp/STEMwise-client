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

  // Greeting Logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    // T11.9: Fetch ROI on mount
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
    <div className="sw-app-root">
      <Navbar 
        isAuthenticated={true} 
        user={{ name: displayName }} 
        onLogout={() => {}} // Logout handled in App level navigation
      />
      
      <div className="dashboard-page-root">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          userName={displayName}
          profile={profile}
        />

        <main className="dashboard-main">
          <div className="dashboard-content animate-fade-in">
          
          {/* T11.2 Greeting Header */}
          <header className="dashboard-header animate-slide-up">
            <div className="greeting-text">
              <h1 className="text-gradient">{getGreeting()}, {displayName} 👋</h1>
              <p>DATA LIVE AS OF {lastUpdated} • STEM ENGINE 2.1</p>
            </div>
            <div className="header-actions">
               <Badge variant="teal">Live ROI Tracker</Badge>
            </div>
          </header>

          {/* T11.6 Policy Alert Banner */}
          <div className="policy-banner-container animate-fade-in">
             <AlertBanner 
               type="warning" 
               title="Policy Update: H-1B Wage-Based Selection" 
               icon={AlertTriangle}
             >
                The DHS has proposed a resume of wage-based prioritization for the March 2026 lottery. Low-wage positions may see significantly reduced selection rates. <a href="#" className="auth-link">Analyze your risk →</a>
             </AlertBanner>
          </div>

          {/* T19.1 & T19.3: Refined Dashboard Grid */}
          <section className="dashboard-grid-overhaul animate-slide-up">
              {/* ROI Score Ring - Primary Visual */}
              <div className="sw-main-ring-panel">
                <ROIScoreRing score={roiResult?.roiPercentage || 72} size={220} />
                <div className="sw-ring-narrative">
                   <h3 className="text-gradient">Strong ROI Potential</h3>
                   <p className="text-secondary">Your profile is trending in the top 15% for STEM graduates from {profile?.nationality || 'India'}.</p>
                </div>
              </div>
              
              {/* StatCards Cluster */}
              <div className="sw-stats-cluster">
                <StatCard 
                  label="10-Year ROI Potential" 
                  value={roiResult?.netEarnings10Yr ? `$${roiResult.netEarnings10Yr.toLocaleString()}` : "$--" } 
                  trend="Excellent" 
                  icon={TrendingUp}
                  subtitle="Net Lifetime Value" 
                />
                <StatCard 
                  label="Debt-Free Milestone" 
                  value={roiResult?.breakEvenYear ? `${roiResult.breakEvenYear} Yrs` : "2.4 Yrs" } 
                  trend="-0.5 Yrs" 
                  icon={Clock}
                  subtitle="Projected Repayment" 
                />
                <StatCard 
                  label="H-1B Chance (Intl)" 
                  value="28.4%" 
                  trend="High Risk" 
                  icon={PieChart}
                  subtitle="Based on MS Quota" 
                />
                <StatCard 
                  label="Total Cost Est." 
                  value={roiResult?.totalInvestment ? `$${roiResult.totalInvestment.toLocaleString()}` : "$--" } 
                  trend={roiResult?.totalInvestment ? `INR ${((roiResult.totalInvestment * 84) / 100000).toFixed(1)}L` : "INR --"} 
                  icon={DollarSign}
                  subtitle="Home Currency FX Rate" 
                />
              </div>
          </section>

          {/* T11.4 & T11.5 Visual Row */}
          <section className="dashboard-row">
             <div className="glass-panel chart-container">
                <h3 className="dashboard-section-title"><TrendingUp size={20} className="text-teal" /> Repayment Timeline</h3>
                <p className="text-secondary" style={{ marginBottom: 'var(--space-8)' }}>Cumulative net worth progression based on median STEM salaries.</p>
                <div style={{ height: '300px' }}>
                  <RepaymentChart />
                </div>
             </div>

             <div className="glass-panel" style={{ padding: 'var(--space-8)' }}>
                <h3 className="dashboard-section-title"><ShieldCheck size={20} className="text-teal" /> Visa Pathway Status</h3>
                <TimelineStep steps={visaSteps} currentStepIndex={1} />
             </div>
          </section>

          {/* Scenario Sandbox */}
          <section style={{ marginTop: 'var(--space-16)' }}>
            <div className="glass-panel" style={{ padding: 'var(--space-8)' }}>
              <div className="flex-between" style={{ marginBottom: 'var(--space-8)' }}>
                 <div>
                    <h3 className="dashboard-section-title"><Zap size={20} className="text-amber" /> ROI Sandbox</h3>
                    <p className="text-secondary">Model adjustments to your loan or tuition to see immediate ROI impact.</p>
                 </div>
                 <Badge variant="warning">Draft Scenario</Badge>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'var(--space-12)', alignItems: 'center' }}>
                <RangeSlider 
                  label="Adjust Loan Amount" 
                  min={10000} 
                  max={150000} 
                  value={loanValue} 
                  onChange={(e) => setLoanValue(parseInt(e.target.value))} 
                  prefix="$"
                />
                <Button variant="primary" icon={Plus} onClick={handleRecalculate} isLoading={isLoading}>
                  Recalculate Projections
                </Button>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>

    <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    {isLoading && <LoadingSpinner fullPage message="Querying .NET Analytics Engine..." />}
  </div>
  );
};


export default Dashboard;
