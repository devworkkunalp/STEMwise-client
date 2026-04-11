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

  // Default probabilities for H-1B lottery (Wage-Based)
  const [wageLevels, setWageLevels] = useState([
    { level: 'Level I', rate: 12, label: 'Entry Level', description: 'Lowest selection probability. High wage-based risk.' },
    { level: 'Level II', rate: 24, label: 'Qualified', description: 'Standard selection rate for most new grads.' },
    { level: 'Level III', rate: 48, label: 'Experienced', description: 'Significantly higher selection odds via wage-based selection.' },
    { level: 'Level IV', rate: 72, label: 'Fully Competent', description: 'Highest priority. Near certain selection in current climate.' },
  ]);

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
          isStem: profile.fieldOfStudy === 'STEM' || profile.specialization?.toLowerCase().includes('computer')
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
  const isStem = profile?.fieldOfStudy === 'STEM' || profile?.specialization?.toLowerCase().includes('computer');
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
    <div className="sw-app-root">
      <Navbar isAuthenticated={true} user={user} />
      
      <div className="visa-page-root">
        <Sidebar activeTab="visa" onTabChange={(id) => setActiveTab(id)} profile={profile} />
        
        <main className="visa-main">
          <div className="visa-content animate-fade-in">
            
            <header className="visa-header">
              <div className="visa-header-info">
                 <Badge variant="teal">Visa Intelligence</Badge>
                 <h1 className="text-gradient">Immigration Roadmap</h1>
                 <p className="text-secondary">AI-driven probability model for <strong>{profile?.nationality || 'India'}</strong> to **H-1B** transition.</p>
              </div>
              <div className="header-actions">
                 <Button variant="outline" icon={Clock}>Detailed Timeline</Button>
              </div>
            </header>

            <div className="visa-grid-layout">
              {/* Left Panel: Timeline */}
              <section className="visa-timeline-panel glass-panel">
                <div className="section-title">
                  <Calendar size={20} className="text-teal" />
                  <h3>Immigration Timeline</h3>
                </div>
                <div className="timeline-wrapper">
                  <TimelineStep steps={visaTimeline} currentStepIndex={1} />
                </div>
              </section>

              {/* Right Panel: Odds Calculator */}
              <section className="visa-odds-panel">
                <div className="glass-panel odds-hero-card">
                  <div className="flex-between">
                    <h3 className="section-title"><TrendingUp size={20} className="text-teal" /> H-1B Selection Odds</h3>
                    <Badge variant="warning">Wage-Based Selection Model</Badge>
                  </div>
                  
                  <div className="probability-summary">
                    <div className="main-odds-value">
                      <span className="odds-number">{(visaData?.cumulativeSuccessProbability * 100).toFixed(1)}%</span>
                      <span className="odds-label">Selection Chance via {visaData?.totalAttempts || 1} Attempt{visaData?.totalAttempts > 1 ? 's' : ''}</span>
                    </div>
                    <div className="odds-narrative">
                      <p>Currently classified as <strong>Level {visaData?.wageLevel || 'II'}</strong> in <strong>{profile?.targetCity || 'San Francisco'}</strong>.</p>
                    </div>
                  </div>

                  <div className="wage-level-chart">
                    {wageLevels.map((lvl) => {
                      const levelInt = parseInt(lvl.level.split(' ')[1]) || (lvl.level === 'Level I' ? 1 : (lvl.level === 'Level II' ? 2 : (lvl.level === 'Level III' ? 3 : 4)));
                      const isUserLevel = visaData?.wageLevel === levelInt;
                      return (
                        <div key={lvl.level} className={`wage-level-bar-item ${isUserLevel ? 'is-active' : ''}`}>
                          <div className="bar-info">
                             <div className="bar-labels">
                               <span className="bar-name">{lvl.level}</span>
                               <span className="bar-desc">{lvl.label}</span>
                             </div>
                             <span className="bar-rate">{lvl.rate}%</span>
                          </div>
                          <div className="bar-track">
                             <div className="bar-fill" style={{ width: `${lvl.rate}%` }}></div>
                          </div>
                          {isUserLevel && (
                            <div className="user-level-indicator">
                              <Zap size={10} fill="currentColor" /> You are here
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="optimization-tip-box">
                    <div className="tip-icon"><Info size={16} /></div>
                    <div className="tip-content">
                        <strong>Optimization Strategy:</strong> {visaData?.optimizationTip || 'Analyzing your profile for wage-level advantages...'}
                    </div>
                  </div>
                </div>

                {/* Alternative Pathways Card */}
                <div className="glass-panel sponsor-list-card alternative-paths-card">
                   <div className="section-title">
                     <ShieldCheck size={20} className="text-teal" />
                     <h3>Global Alternative Pathways</h3>
                   </div>
                   <div className="path-grid">
                      <div className="path-item">
                         <div className="path-header">
                            <span className="path-name">Canada</span>
                            <Badge variant="success">High Odds</Badge>
                         </div>
                         <p>Express Entry STEM category probability >75% for your profile.</p>
                      </div>
                      <div className="path-item">
                         <div className="path-header">
                            <span className="path-name">UK / Germany</span>
                            <Badge variant="primary">Stable</Badge>
                         </div>
                         <p>Direct sponsorship via Blue Card (DE) or Scale-up (UK) is viable.</p>
                      </div>
                      <div className="path-item">
                         <div className="path-header">
                            <span className="path-name">O-1 / EB-2 NIW</span>
                            <Badge variant="warning">High Merit</Badge>
                         </div>
                         <p>Viable extraordinary ability route if profile score exceeds 85/100.</p>
                      </div>
                   </div>
                </div>

                {/* Top Sponsors in Metro */}
                <div className="glass-panel sponsor-list-card">
                   <div className="section-title">
                     <Building2 size={20} className="text-teal" />
                     <h3>Top H-1B Sponsors in {profile?.targetCity?.split(',')[0]}</h3>
                   </div>
                   <div className="sponsor-list">
                     {employers.length > 0 ? employers.map((emp) => (
                       <div key={emp.id} className="sponsor-item">
                          <div className="sponsor-info">
                             <span className="sponsor-name">{emp.name}</span>
                             <span className="sponsor-industry">{emp.primaryStemFields?.slice(0, 2).join(', ')}</span>
                          </div>
                          <div className="sponsor-stats">
                             <span className="sponsor-filings">{(emp.h1bFilingsTotal || 0).toLocaleString()} <span>Filings</span></span>
                             <Badge variant="teal">{emp.sponsorScore}/100 Score</Badge>
                          </div>
                       </div>
                     )) : (
                       <div className="text-secondary p-4">Searching local sponsorship data...</div>
                     )}
                   </div>
                </div>
              </section>
            </div>

          </div>
        </main>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      {isLoading && <LoadingSpinner fullPage message="Querying USCIS & DOL Benchmark Data..." />}
    </div>
  );
};

export default VisaPathway;
