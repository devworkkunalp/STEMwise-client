import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  TrendingUp, 
  Clock, 
  Search,
  Zap,
  Info,
  Building2,
  Calendar,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import visaService from '../../services/visaService';
import calculationService from '../../services/calculationService';

// Components
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import StatCard from '../../components/StatCard/StatCard';
import TimelineStep from '../../components/TimelineStep/TimelineStep';
import Badge from '../../components/Badge/Badge';
import Button from '../../components/Button/Button';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import BottomNav from '../../components/BottomNav/BottomNav';

import './VisaPathway.css';

const VisaPathway = () => {
  const { user, profile, loading: authLoading, authError, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('visa');
  const [isLoading, setIsLoading] = useState(false);
  const [visaData, setVisaData] = useState(null);
  const [employers, setEmployers] = useState([]);

  // The probability matrix is now driven by the backend
  const displayWageLevels = visaData?.probabilityMatrix || [
    { level: 'Level I', rate: 15, label: 'Entry Level', description: 'Lowest selection probability.' },
    { level: 'Level II', rate: 48, label: 'Qualified', description: 'Standard selection rate.' },
    { level: 'Level III', rate: 61, label: 'Experienced', description: 'Higher selection odds.' },
    { level: 'Level IV', rate: 78, label: 'Fully Competent', description: 'Highest priority.' },
  ];

  // Hardcoded Timeline for Arjun's Profile (Standard STEM)
  const timelineSteps = [
    { id: 1, title: 'F-1 Study Phase', status: 'Completed', duration: '2 Years', description: 'Maintain full-time status at university.' },
    { id: 2, title: 'OPT Phase 1', status: 'Active', duration: '12 Months', description: 'First year of work authorization.' },
    { id: 3, title: 'STEM Extension', status: 'Pending', duration: '24 Months', description: 'Additional 2 years for STEM degrees.' },
    { id: 4, title: 'H-1B Lottery 1', status: 'Risk', duration: 'April 2026', description: 'First chance for sponsorship.', risk: 'Wage-based selection' },
    { id: 5, title: 'H-1B Lottery 2', status: 'Pending', duration: 'April 2027', description: 'Second chance if first attempt fails.' },
    { id: 6, title: 'H-1B Lottery 3', status: 'Pending', duration: 'April 2028', description: 'Final attempt under STEM OPT.' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!profile) return;
      setIsLoading(true);
      try {
        const response = await calculationService.getVisaProbability({
          salary: profile.targetSalary || 115000,
          city: profile.targetCity || 'San Francisco',
          fieldOfStudy: profile.specialization || 'CS',
          isStem: profile.stemField === 'STEM' || profile.specialization?.toLowerCase().includes('computer')
        });
        setVisaData(response);

        const topEmployers = await visaService.getTopSponsors(profile?.targetCity?.split(',')[0] || 'San Jose');
        setEmployers(topEmployers);

      } catch (err) {
        console.error("Error loading visa data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [profile]);

  // Dynamic Timeline Calculation
  const isStem = profile?.stemField === 'STEM' || profile?.specialization?.toLowerCase().includes('computer');
  const visaTimeline = [
    { id: 1, title: 'F-1 Study Phase', status: 'Completed', duration: `${profile?.programDurationYears || 2} Years`, description: 'Full-time study authorization.' },
    { id: 2, title: 'OPT Phase 1', status: 'Active', duration: '12 Months', description: 'Initial work authorization.' },
    isStem && { id: 3, title: 'STEM Extension', status: 'In Scope', duration: '24 Months', description: 'Additional 2 years of work authorization.' },
    { id: 4, title: 'H-1B Lottery 1', status: 'Risk', duration: 'April 2026', description: 'First sponsorship attempt.', risk: 'Wage-based' },
    isStem && { id: 5, title: 'H-1B Lottery 2', status: 'Pending', duration: 'April 2027', description: 'Second attempt.' },
    isStem && { id: 6, title: 'H-1B Lottery 3', status: 'Pending', duration: 'April 2028', description: 'Final attempt.' },
  ].filter(Boolean);

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

  if (authLoading && !profile) return <LoadingSpinner fullPage message="Securely retrieving your visa pathway..." />;

  return (
    <div className="shell">
      <Sidebar activeTab="visa" onTabChange={(id) => setActiveTab(id)} profile={profile} userName={profile?.displayName || user?.email?.split('@')[0] || 'Student'} />
      
      <div className="main">
        <div id="pg-visa" className="page active" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="topbar">
            <div>
              <div className="tb-breadcrumb">VISA PATHWAY</div>
              <div className="tb-title">Immigration Roadmap</div>
            </div>
            <div className="tb-right">
              <div style={{ fontSize: '11px', color: 'var(--hint)', fontFamily: 'var(--fm)' }}>
                Targeting: {profile?.targetCity || 'San Francisco'}
              </div>
              <button className="btn btn-outline" onClick={() => alert('Detailed probability breakdown for each attempt coming soon!')}>
                Detailed Timeline
              </button>
            </div>
          </div>

          <div className="pbody">
            
            <div className="section-title" style={{ fontSize: '20px', marginBottom: '20px' }}>
              <span className="badge b-teal" style={{ marginBottom: '8px' }}>Visa Intelligence</span>
              <div>AI-driven probability model for {profile?.nationality || 'India'} to H-1B transition.</div>
            </div>

            <div className="g-7030">
              {/* Left Panel: Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="card">
                  <div className="section-title" style={{ marginBottom: '16px' }}>Your Immigration Chain</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    
                    <div style={{ display: 'flex', gap: '14px', padding: '14px 0', borderBottom: '1px solid var(--bdr)' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--teal)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: 'var(--navy)', flexShrink: 0 }}>1</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--white)' }}>F-1 Student Visa</div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>Duration: {profile?.programDurationYears || 2} years · Status: Active · Fall 2026 entry</div>
                        <span className="badge b-teal" style={{ marginTop: '5px' }}>Active</span>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '14px', padding: '14px 0', borderBottom: '1px solid var(--bdr)' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: 'var(--navy)', flexShrink: 0 }}>2</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--white)' }}>OPT — 12 Months</div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>Post-graduation work auth · Avg salary ${((profile?.targetSalary || 115000) * 0.85 / 1000).toFixed(0)}K–${((profile?.targetSalary || 115000) * 1.05 / 1000).toFixed(0)}K</div>
                        <div style={{ fontSize: '11px', color: 'var(--hint)', marginTop: '2px' }}>60-day unemployment limit · Loan repayment begins</div>
                      </div>
                    </div>

                    {isStem && (
                      <div style={{ display: 'flex', gap: '14px', padding: '14px 0', borderBottom: '1px solid var(--bdr)' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--sky)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: 'var(--navy)', flexShrink: 0 }}>3</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--white)' }}>STEM OPT +24 Months</div>
                          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>CIP code eligible ✓ · E-Verify employer required</div>
                          <div style={{ fontSize: '11px', color: 'var(--teal)', marginTop: '2px', fontWeight: '500' }}>3 H-1B lottery entries — use every one</div>
                        </div>
                      </div>
                    )}
                    
                    <div style={{ display: 'flex', gap: '14px', padding: '14px 0' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(244,168,50,.15)', border: '2px dashed var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: 'var(--amber)', flexShrink: 0 }}>{isStem ? '4' : '3'}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--amber)' }}>H-1B Decision (Wage-Based)</div>
                        <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>Wage-based lottery · Feb 2026 system active</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                           <span className="badge b-teal" style={{ fontSize: '9px' }}>$100K Fee Exempt</span>
                           <span style={{ fontSize: '10px', color: 'var(--hint)' }}>Filing from within US (Change of Status) ✓</span>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--amber)', marginTop: '6px' }}>Your estimated odds shown →</div>
                      </div>
                    </div>
                    
                  </div>
                </div>
                
                {/* If denied */}
                <div className="card card-amber">
                  <div className="section-title" style={{ color: 'var(--amber)', marginBottom: '14px' }}>If H-1B Denied — Your Alternative Paths</div>
                  <div className="g2" style={{ gap: '10px' }}>
                    <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,.05)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--white)', fontWeight: '600' }}>O-1 Visa</div>
                      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Extraordinary ability route</div>
                      <div style={{ fontSize: '10px', color: 'var(--teal)', marginTop: '4px' }}>ROI: 68 · Payback +0.4yr</div>
                    </div>
                    <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,.05)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--white)', fontWeight: '600' }}>EB-2 NIW</div>
                      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>National Interest Waiver</div>
                      <div style={{ fontSize: '10px', color: 'var(--teal)', marginTop: '4px' }}>ROI: 70 · Payback +0.3yr</div>
                    </div>
                    <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,.05)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--white)', fontWeight: '600' }}>Canada Express Entry</div>
                      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>PGWP → PR pathway</div>
                      <div style={{ fontSize: '10px', color: 'var(--teal)', marginTop: '4px' }}>ROI: 61 · Payback 3.8yr</div>
                    </div>
                    <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,.05)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--white)', fontWeight: '600' }}>Return Home</div>
                      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Expat premium path</div>
                      <div style={{ fontSize: '10px', color: 'var(--coral)', marginTop: '4px' }}>ROI: 52 · Payback 5.8yr</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Odds & Models */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                <div className="card card-purple">
                  <div className="section-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={16} /> H-1B Odds</span>
                     <span className="badge b-amber">Wage-Based Model</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', margin: '20px 0' }}>
                    <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--n4)', textAlign: 'center', border: '1px solid var(--bdr)' }}>
                      <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'var(--fd)', color: 'var(--teal)', lineHeight: '1' }}>
                        {(visaData?.cumulativeSuccessProbability * 100).toFixed(1)}%
                      </div>
                      <div className="eyebrow" style={{ marginTop: '6px' }}>Selection via {visaData?.totalAttempts || 1} Attempt{visaData?.totalAttempts > 1 ? 's' : ''}</div>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      Currently classified as <strong style={{ color: 'var(--white)' }}>Level {visaData?.wageLevel || 'II'}</strong> in <strong style={{ color: 'var(--white)' }}>{profile?.targetCity || 'San Francisco'}</strong>.
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {displayWageLevels.map((lvl) => {
                      const isUserLevel = lvl.level.includes(visaData?.wageLevel || 'II');
                      return (
                        <div key={lvl.level} style={{ padding: '10px 14px', borderRadius: '8px', background: isUserLevel ? 'rgba(0,201,167,.08)' : 'var(--n4)', border: `1px solid ${isUserLevel ? 'rgba(0,201,167,.3)' : 'transparent'}` }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px' }}>
                            <strong style={{ color: isUserLevel ? 'var(--teal)' : 'var(--white)' }}>{lvl.level} — {lvl.label}</strong>
                            <strong style={{ fontFamily: 'var(--fm)' }}>{lvl.rate}%</strong>
                          </div>
                          <div className="prog-track">
                             <div className="prog-fill" style={{ width: `${lvl.rate}%`, background: isUserLevel ? 'var(--color-teal)' : 'var(--n5)' }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="alert a-info" style={{ marginTop: '16px', marginBottom: 0 }}>
                    <span>💡</span>
                    <div>
                        <strong>Optimization Strategy</strong>
                        {visaData?.optimizationTip || 'Analyzing your profile for wage-level advantages...'}
                    </div>
                  </div>
                </div>

                <div className="card">
                   <div className="section-title">Global Alternative Pathways</div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ background: 'var(--n4)', padding: '12px', borderRadius: '8px' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <strong style={{ fontSize: '12px', color: 'var(--sky)' }}>Canada</strong>
                            <span className="badge b-sky">{isStem ? 'High Odds' : 'Viable'}</span>
                         </div>
                         <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                            {isStem ? "Express Entry STEM category probability >75% for your profile. Direct PR route likely." : "General Express Entry or PNP is a strong alternative."}
                         </div>
                      </div>
                      <div style={{ background: 'var(--n4)', padding: '12px', borderRadius: '8px' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <strong style={{ fontSize: '12px', color: 'var(--amber)' }}>UK / Germany</strong>
                            <span className="badge b-amber">Stable</span>
                         </div>
                         <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                            Direct sponsorship via EU Blue Card (Germany) or Skilled Worker (UK) is highly viable.
                         </div>
                      </div>
                      <div style={{ background: 'var(--n4)', padding: '12px', borderRadius: '8px' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <strong style={{ fontSize: '12px', color: 'var(--purple)' }}>O-1 / EB-2 NIW</strong>
                            <span className="badge b-purple">{visaData?.cumulativeSuccessProbability > 0.8 ? "Recommended" : "High Merit"}</span>
                         </div>
                         <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                            {visaData?.wageLevel >= 3 ? "Your high wage level and role specialization make you a strong candidate for an O-1A." : "Viable merit-based route if your achievements exceed benchmarks."}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="card">
                   <div className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <Building2 size={16} className="text-teal" /> Top H-1B Sponsors in {profile?.targetCity?.split(',')[0]}
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px' }}>
                     {employers.length > 0 ? (
                       employers.map((emp) => (
                         <div key={emp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--bdr)' }}>
                            <div>
                               <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--white)' }}>{emp.name}</div>
                               <div style={{ fontSize: '10px', color: 'var(--hint)' }}>{emp.primaryStemFields?.slice(0, 2).join(', ')}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                               <div style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--teal)' }}>{(emp.h1bFilingsTotal || 0).toLocaleString()} <span>Filings</span></div>
                               <div className="badge b-dim" style={{ marginTop: '2px' }}>{emp.sponsorScore}/100 Score</div>
                            </div>
                         </div>
                       ))
                     ) : (
                       <div style={{ padding: '24px', textAlign: 'center', color: 'var(--hint)' }}>
                         <Search size={24} style={{ opacity: 0.5, marginBottom: '8px' }} />
                         <div style={{ fontSize: '12px' }}>No major sponsors found for {profile?.targetCity?.split(',')[0]} in our current benchmarks.</div>
                       </div>
                     )}
                   </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
export default VisaPathway;
