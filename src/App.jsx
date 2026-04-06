import React, { useState, useEffect } from 'react';
import { Download, Plus, Globe, Shield, LogIn } from 'lucide-react';

// Auth & Services
import { useAuth } from './context/AuthContext';
import authService from './services/authService';
import calculationService from './services/calculationService';

// Atomic Components
import Button from './components/Button/Button';
import Badge from './components/Badge/Badge';
import InputField from './components/InputField/InputField';
import SelectField from './components/SelectField/SelectField';
import RangeSlider from './components/RangeSlider/RangeSlider';

// Visual Components
import StatCard from './components/StatCard/StatCard';
import ROIScoreRing from './components/ROIScoreRing/ROIScoreRing';
import ProgressBar from './components/ProgressBar/ProgressBar';
import AlertBanner from './components/AlertBanner/AlertBanner';

// Layout & Navigation
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import Modal from './components/Modal/Modal';

// Complex Widgets
import ComparisonTable from './components/ComparisonTable/ComparisonTable';
import TimelineStep from './components/TimelineStep/TimelineStep';

import './index.css';

function App() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanValue, setLoanValue] = useState(45000);
  const [isLoading, setIsLoading] = useState(false);
  const [roiResult, setRoiResult] = useState(null);

  // Sample Data (to be replaced by API calls in next phases)
  const comparisonData = [
    { name: 'USA', flag: '🇺🇸', roi: 124, cost: 85000, payback: 3.5, h1bChance: 28, isBest: 'roi' },
    { name: 'Germany', flag: '🇩🇪', roi: 98, cost: 12000, payback: 2.1, h1bChance: 85, isBest: 'payback' },
    { name: 'Canada', flag: '🇨🇦', roi: 82, cost: 45000, payback: 4.2, h1bChance: 92, isBest: 'h1bChance' },
  ];

  const visaSteps = [
    { id: 1, title: 'F-1 Student Visa', status: 'Completed', duration: '2 Years', description: 'Maintain full-time enrollment and valid I-20.' },
    { id: 2, title: 'OPT / STEM Extension', status: 'Active', duration: '3 Years', description: 'Work authorization for STEM graduates.', risk: 'Strict employment reporting required.' },
    { id: 3, title: 'H-1B Lottery', status: 'Pending', duration: 'Variable', description: 'Employer-sponsored work visa lottery.' },
    { id: 4, title: 'I-140 Greencard', status: 'Pending', duration: '5-10 Years', description: 'Permanent residency application.' },
  ];

  const handleCalculateROI = async () => {
    if (!isAuthenticated) {
      alert("Please sign in to run calculations.");
      return;
    }
    
    setIsLoading(true);
    try {
      // Real API Call to .NET Backend
      const result = await calculationService.calculateROI({
        loanAmount: loanValue,
        degreeType: 'MS CS',
        country: 'USA'
      });
      setRoiResult(result);
    } catch (error) {
      console.error("Calculation failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await authService.signOut();
  };

  if (authLoading) return <LoadingSpinner fullPage message="Authenticating..." />;

  return (
    <div className="sw-app-root">
      <Navbar 
        isAuthenticated={isAuthenticated} 
        user={{ name: user?.email?.split('@')[0] || 'User' }} 
        onLogout={handleLogout}
      />
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="sw-main-content">
        <div className="container-premium animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
          
          {!isAuthenticated ? (
            <div className="flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <Badge variant="warning">Auth Required</Badge>
              <h1 className="text-gradient">Unlock Financial Insights</h1>
              <p className="text-secondary" style={{ maxWidth: '400px', textAlign: 'center' }}>
                Sign in to access the STEMwise calculation engine and compare global ROI scenarios.
              </p>
              <Button variant="primary" icon={LogIn} onClick={() => window.location.href = '/login'}>
                Go to Login
              </Button>
            </div>
          ) : (
            <>
              <header style={{ marginBottom: 'var(--space-12)' }}>
                <Badge variant="excellent" style={{ marginBottom: 'var(--space-4)' }}>Connected to .NET Engine</Badge>
                <h1 className="text-gradient" style={{ fontSize: 'var(--fs-5xl)' }}>Executive Dashboard</h1>
                <p className="text-secondary" style={{ maxWidth: '600px', marginTop: 'var(--space-2)' }}>
                  Real-time projections generated by your unique financial profile.
                </p>
              </header>

              <AlertBanner type="info" title="Session Active">
                Your credentials have been securely verified via Supabase. API tokens are auto-injected.
              </AlertBanner>

              {/* Data Visuals */}
              <section style={{ marginTop: 'var(--space-16)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)' }}>
                  <div className="glass-panel glass-card flex-center" style={{ padding: 'var(--space-8)' }}>
                    <ROIScoreRing score={roiResult?.score || 72} size={220} />
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                    <StatCard 
                      label="Projected 10-Year ROI" 
                      value={roiResult ? `$${roiResult.totalROI.toLocaleString()}` : "$--" } 
                      trend="3.2%" 
                      trendDirection="up" 
                      subtitle="Net Career Value" 
                    />
                    <StatCard 
                      label="Debt-Free Milestone" 
                      value={roiResult ? `${roiResult.paybackYears} Yrs` : "--" } 
                      trend="0.5" 
                      trendDirection="down" 
                      subtitle="Est. Payback Period" 
                    />
                  </div>

                  <div className="glass-panel glass-card" style={{ padding: 'var(--space-8)' }}>
                    <h3>Live Status</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
                      <ProgressBar progress={65} label="Savings Goal" value="$32,500 / $50k" />
                      <ProgressBar progress={roiResult ? 100 : 0} label="API Sync" value={roiResult ? "Synchronized" : "Stale"} variant="teal" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Interaction */}
              <section style={{ marginTop: 'var(--space-16)' }}>
                <div className="glass-panel" style={{ padding: 'var(--space-8)' }}>
                  <h3 style={{ marginBottom: 'var(--space-6)' }}>Model New Scenario</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-12)' }}>
                    <RangeSlider 
                      label="Loan Amount" 
                      min={10000} 
                      max={150000} 
                      value={loanValue} 
                      onChange={(e) => setLoanValue(parseInt(e.target.value))} 
                      prefix="$"
                    />
                    <div style={{ paddingTop: 'var(--space-4)' }}>
                      <Button variant="primary" icon={Plus} fullWidth onClick={handleCalculateROI} isLoading={isLoading}>
                        Calculate New ROI
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Pathway */}
              <section style={{ marginTop: 'var(--space-16)' }}>
                <h2 style={{ marginBottom: 'var(--space-8)' }}>Global Comparison</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-8)' }}>
                  <ComparisonTable data={comparisonData} />
                  <div className="glass-panel glass-card" style={{ padding: 'var(--space-8)' }}>
                    <h3 style={{ marginBottom: 'var(--space-8)' }}>US Pathway Timeline</h3>
                    <TimelineStep steps={visaSteps} currentStepIndex={1} />
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      {isLoading && <LoadingSpinner fullPage message="Querying .NET Engine..." />}
    </div>
  );
}

export default App;

