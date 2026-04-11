import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Zap, 
  ArrowUpRight, 
  ArrowRight,
  Info,
  AlertTriangle,
  ChevronRight,
  Target,
  Globe,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import scenarioService from '../../services/scenarioService';
import calculationService from '../../services/calculationService';

// Components
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import StatCard from '../../components/StatCard/StatCard';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import BottomNav from '../../components/BottomNav/BottomNav';

import './WhatIfEngine.css';

const scenarioCards = [
  { id: 'H1B_DENIED', title: 'H-1B Lottery Denied', description: 'Model impact of returning home after OPT expiration.', icon: ShieldAlert, color: 'coral' },
  { id: 'RECESSION', title: 'Economic Recession', description: 'Model a 20% drop in target STEM salaries.', icon: TrendingDown, color: 'amber' },
  { id: 'CURRENCY_CRASH', title: 'Currency Devaluation', description: 'Model a 20% spike in repayment cost due to FX.', icon: DollarSign, color: 'sky' },
  { id: 'JOB_GAP', title: 'Extended Job Search', description: 'Model 6 months of unemployment post-graduation.', icon: Clock, color: 'teal' },
  { id: 'LEVEL_3_PROMO', title: 'Level 3 Promotion', description: 'Model wage-based H-1B prioritization boost.', icon: Zap, color: 'indigo' },
  { id: 'STUDY_DELAY', title: 'Progression Delay', description: 'Model 1-year gap in degree completion.', icon: ArrowUpRight, color: 'rose' }
];

const WhatIfEngine = () => {
  const { user, profile, loading: authLoading, authError, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('scenarios');
  const [isLoading, setIsLoading] = useState(false);
  const [baseROI, setBaseROI] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [modeledResult, setModeledResult] = useState(null);

  useEffect(() => {
    const fetchBase = async () => {
      if (!profile) return;
      setIsLoading(true);
      try {
        const latest = await calculationService.calculateROI({
          annualTuition: profile?.annualTuition || 45000,
          annualLivingCost: profile?.annualLivingCost || 18000,
          durationYears: profile?.programDuration || 2,
          finalSalaryBenchmark: profile?.targetSalary || 115000,
          currentSalary: profile?.currentSalary || 15000,
          homeCurrency: profile?.nationality === 'India' ? 'INR' : 'USD',
          studyCurrency: 'USD',
          taxRate: 0.25
        });
        setBaseROI(latest);
      } catch (err) {
        console.error("Failed to fetch base ROI", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBase();
  }, [profile]);

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

  if (authLoading && !profile) return <LoadingSpinner fullPage message="Securely retrieving your risk scenarios..." />;

  const selectScenario = async (s) => {
    if (!profile) return;
    setIsLoading(true);
    setSelectedScenario(s);
    try {
      const result = await scenarioService.modelScenario(profile.id, s.id);
      setModeledResult(result);
      
      // Scroll to detail smoothly
      setTimeout(() => {
          const detail = document.getElementById('scenario-detail-view');
          if (detail) detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error("Modeling failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveScenarioResult = async () => {
    if (!modeledResult) return;
    try {
      await scenarioService.saveScenario(modeledResult);
      alert("Scenario saved to your profile history!");
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  return (
    <div className="sw-app-root">
      <Navbar isAuthenticated={true} user={user} />
      
      <div className="whatif-page-root">
        <Sidebar activeTab="scenarios" onTabChange={(id) => setActiveTab(id)} profile={profile} />
        
        <main className="whatif-main">
          <div className="whatif-content animate-fade-in">
            
            <header className="whatif-header">
              <div className="whatif-header-info">
                 <Badge variant="primary">Risk Intelligence</Badge>
                 <h1 className="text-gradient">What-If Engine</h1>
                 <p className="text-secondary">Stress-test your STEM degree against global hiring and policy risks.</p>
              </div>
              <div className="header-actions">
                 <Button variant="outline" icon={Globe}>Global Standards</Button>
              </div>
            </header>

            {/* Scenario Discovery Grid */}
            <section className="scenario-grid">
               {scenarioCards.map((s, idx) => (
                 <button 
                   key={s.id} 
                   className={`glass-panel scenario-card animate-fade-in ${selectedScenario?.id === s.id ? 'is-active' : ''}`}
                   style={{ animationDelay: `${idx * 50}ms` }}
                   onClick={() => selectScenario(s)}
                 >
                    <div className={`card-icon-box bg-${s.color}`}>
                       <s.icon size={24} />
                    </div>
                    <div className="card-text">
                       <h4>{s.title}</h4>
                       <p>{s.description}</p>
                    </div>
                    <ChevronRight size={16} className="text-muted" />
                 </button>
               ))}
            </section>

            {/* Impact Detail View */}
            {selectedScenario && modeledResult && (
              <section id="scenario-detail-view" className="scenario-analysis glass-panel animate-slide-up">
                 <div className="analysis-header flex-between">
                    <div className="analysis-title-stack">
                       <h2 className="title-gradient">Impact Analysis: {selectedScenario.title}</h2>
                       <p className="text-secondary">Recalculated ROI based on the current profile for {profile?.nationality || 'India'}.</p>
                    </div>
                    <Button variant="primary" icon={Plus} onClick={saveScenarioResult}>Save to Profile</Button>
                 </div>

                 <div className="analysis-metrics-row">
                    <div className="delta-card base-delta">
                       <span className="delta-label">Base ROI</span>
                       <span className="delta-value">{Math.round(modeledResult?.baseRoi || 0)}%</span>
                    </div>
                    <div className="delta-arrow">
                       <ArrowRight size={32} className={(modeledResult?.impactScore || 0) < 0 ? 'text-coral' : 'text-teal'} />
                       <span className={`impact-badge ${(modeledResult?.impactScore || 0) < 0 ? 'bg-coral' : 'bg-teal'}`}>
                          {(modeledResult?.impactScore || 0) > 0 ? '+' : ''}{Math.round(modeledResult?.impactScore || 0)}
                       </span>
                    </div>
                    <div className={`delta-card adjusted-delta ${(modeledResult?.impactScore || 0) < 0 ? 'is-negative' : 'is-positive'}`}>
                       <span className="delta-label">Adjusted ROI</span>
                       <span className="delta-value">{Math.round(modeledResult?.adjustedRoi || 0)}%</span>
                    </div>
                 </div>

                 {/* New Metrics Table */}
                 <div className="metrics-detail-grid">
                    {modeledResult.metrics?.map((m, idx) => (
                       <div key={idx} className="metric-detail-card">
                          <span className="m-label">{m.label}</span>
                          <div className="m-values">
                             <span className="m-base">{m.baseValue}</span>
                             <ArrowRight size={12} className="text-muted" />
                             <span className={`m-adj ${m.isNegative ? 'text-coral' : 'text-teal'}`}>{m.adjustedValue}</span>
                          </div>
                       </div>
                    ))}
                 </div>

                 <div className="analysis-narrative-box">
                    <div className="narrative-icon text-amber"><AlertTriangle size={20} /></div>
                    <div className="narrative-content">
                       <h4>Strategic Risk Assessment</h4>
                       <p className="text-secondary">{modeledResult.narrative}</p>
                    </div>
                 </div>

                 <div className="pivot-pathways-row">
                    <h3 className="dashboard-section-title"><Target size={20} className="text-teal" /> Recommended Pivots</h3>
                    <div className="pivot-grid">
                       {modeledResult.recommendedPivots?.map((p, idx) => (
                         <div key={idx} className="pivot-item glass-card">
                            <div className="pivot-icon bg-sky"><Globe size={18} /></div>
                            <div className="pivot-info">
                               <span className="pivot-name">{p.name}</span>
                               <span className="pivot-roi">ROI: {p.roi} ({p.riskLevel} Risk)</span>
                            </div>
                            <ChevronRight size={14} className="text-muted" />
                         </div>
                       ))}
                    </div>
                 </div>
              </section>
            )}

          </div>
        </main>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      {isLoading && <LoadingSpinner fullPage message="Stress-Testing Global Scenarios..." />}
    </div>
  );
};

export default WhatIfEngine;
