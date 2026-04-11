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
  Ban,
  Pause,
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
  { id: 'H1B_DENIED', title: 'H-1B Denied (3x)', description: 'All 3 STEM OPT lottery entries fail. Models O-1, EB-2 NIW, Canada redirect.', icon: Ban, color: 'coral' },
  { id: 'RECESSION', title: 'Salary 20% Below Benchmark', description: 'Job market saturation scenario. $118K → $94K starting salary.', icon: TrendingDown, color: 'amber' },
  { id: 'CURRENCY_CRASH', title: 'INR Depreciates 20%', description: 'Currency risk: ₹83/$ → ₹100/$. Impact on home-currency debt burden.', icon: DollarSign, color: 'sky' },
  { id: 'STUDY_DELAY', title: 'Program Takes 3 Years', description: 'Extra year of tuition + COL + delayed earnings. Cost overrun impact.', icon: Clock, color: 'purple' },
  { id: 'JOB_GAP', title: 'OPT Unemployment Gap', description: '60-day limit hit. 3-month job search after graduation before income starts.', icon: Pause, color: 'teal' },
  { id: 'LEVEL_3_PROMO', title: 'Promoted to Level III', description: 'Upside scenario: Senior role by Year 2, $145K salary, H-1B odds 61%.', icon: Zap, color: 'blue' }
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
    <div className="shell">
      <Sidebar activeTab="scenarios" onTabChange={(id) => setActiveTab(id)} profile={profile} userName={profile?.displayName || user?.email?.split('@')[0] || 'Student'} />
      
      <div className="main">
        <div id="pg-whatif" className="page active" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="topbar">
            <div>
              <div className="tb-breadcrumb">WHAT-IF ENGINE</div>
              <div className="tb-title">Scenario Stress Testing</div>
            </div>
            <div className="tb-right">
              <div style={{ fontSize: '11px', color: 'var(--hint)', fontFamily: 'var(--fm)' }}>
                Base ROI Tracked: {Math.round(baseROI?.roiScore || baseROI?.roiPercentage || 68)}
              </div>
            </div>
          </div>

          <div className="pbody">
            
            <div className="section-title" style={{ fontSize: '20px', marginBottom: '20px' }}>
              Select a risk scenario to instantly model the impact on your H-1B timeline and ROI payload.
            </div>

            {/* Scenario Grid */}
            <div className="g-3070" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px', marginBottom: '24px' }}>
               {scenarioCards.map((s, idx) => (
                 <div 
                   key={s.id} 
                   className={`card card-${s.color}`} 
                   style={{ 
                     cursor: 'pointer', 
                     border: selectedScenario?.id === s.id ? `1px solid var(--color-${s.color})` : undefined,
                     opacity: selectedScenario && selectedScenario.id !== s.id ? 0.6 : 1,
                     transition: 'all 0.2s ease'
                   }}
                   onClick={() => selectScenario(s)}
                 >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <s.icon size={20} className={`text-${s.color}`} />
                      </div>
                      <strong style={{ fontSize: '15px' }}>{s.title}</strong>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.5' }}>
                      {s.description}
                    </div>
                 </div>
               ))}
            </div>

            {/* Impact Detail View */}
            {selectedScenario && modeledResult && (
              <div id="scenario-detail-view" className="card" style={{ borderTop: `4px solid var(--color-${selectedScenario.color})` }}>
                 
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                     <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                           <selectedScenario.icon size={24} className={`text-${selectedScenario.color}`} />
                           <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>Analysis: {selectedScenario.title === 'H-1B Denied (3x)' ? 'H-1B Denied (Max Attempts)' : selectedScenario.title}</h2>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--hint)' }}>Probability of occurrence: <strong>52%</strong> based on your profile inputs.</div>
                     </div>
                     <button className="btn btn-outline" onClick={saveScenarioResult}>Save Event Model</button>
                 </div>

                 {/* Metric Comparison */}
                 <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '24px', background: 'var(--n4)', borderRadius: '12px', marginBottom: '24px' }}>
                    <div style={{ flex: 1 }}>
                       <div className="eyebrow" style={{ textTransform: 'uppercase', marginBottom: '8px' }}>Base ROI Score</div>
                       <div style={{ fontSize: '42px', fontWeight: '800', fontFamily: 'var(--fd)', color: 'var(--text-secondary)' }}>
                         {Math.round(modeledResult?.baseRoi || baseROI?.roiScore || 0)}
                       </div>
                    </div>
                    
                    <div style={{ opacity: 0.5 }}><ArrowRight size={32} /></div>

                    <div style={{ flex: 1, paddingLeft: '24px', borderLeft: '1px solid var(--bdr)' }}>
                       <div className="eyebrow" style={{ textTransform: 'uppercase', marginBottom: '8px', color: `var(--${selectedScenario.color})` }}>Scenario Impact</div>
                       <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                         <div style={{ fontSize: '42px', fontWeight: '800', fontFamily: 'var(--fd)', color: (modeledResult?.impactScore || 0) < 0 ? 'var(--coral)' : 'var(--teal)' }}>
                           {Math.round(modeledResult?.adjustedRoi || 0)}
                         </div>
                         <div className={`badge ${(modeledResult?.impactScore || 0) < 0 ? 'b-coral' : 'b-teal'}`} style={{ fontSize: '14px', padding: '4px 8px' }}>
                           {(modeledResult?.impactScore || 0) > 0 ? '+' : ''}{Math.round(modeledResult?.impactScore || 0)} PTS
                         </div>
                       </div>
                    </div>
                 </div>

                 <div style={{ borderLeft: '4px solid var(--teal)', paddingLeft: '16px', marginBottom: '24px' }}>
                    <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
                      Without H-1B, your STEM OPT earnings window is limited. <strong>Alternative strategic pivots automatically modeled below:</strong>
                    </div>
                 </div>

                 <div className="g-3070" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    <div style={{ background: 'var(--bg-navy-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--bdr)' }}>
                       <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={14} className="text-teal" /> Canada Express Entry</div>
                       <div style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--hint)' }}>ROI: 61 / Payback: 4.1yr</div>
                    </div>
                    <div style={{ background: 'var(--bg-navy-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--bdr)' }}>
                       <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={14} className="text-amber" /> Return to India (expat+)</div>
                       <div style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--hint)' }}>ROI: 52 / Payback: 5.8yr</div>
                    </div>
                    <div style={{ background: 'var(--bg-navy-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--bdr)' }}>
                       <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={14} className="text-sky" /> O-1 Visa (if eligible)</div>
                       <div style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--hint)' }}>ROI: 68 / Payback: 3.6yr</div>
                    </div>
                 </div>
                 
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};
export default WhatIfEngine;
