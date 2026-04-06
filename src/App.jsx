import React, { useState } from 'react';
import { Download, Plus, Info, Globe, Shield } from 'lucide-react';


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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loanValue, setLoanValue] = useState(45000);
  const [isLoading, setIsLoading] = useState(false);

  // Sample Data
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

  const handleAsyncAction = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="sw-app-root">
      <Navbar isAuthenticated={true} user={{ name: 'Arjun Patil' }} />
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="sw-main-content">
        <div className="container-premium animate-fade-in" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
          
          <header style={{ marginBottom: 'var(--space-12)' }}>
            <Badge variant="excellent" style={{ marginBottom: 'var(--space-4)' }}>STEMwise UI-Kit v1.0</Badge>
            <h1 className="text-gradient" style={{ fontSize: 'var(--fs-5xl)' }}>Component Gallery</h1>
            <p className="text-secondary" style={{ maxWidth: '600px', marginTop: 'var(--space-2)' }}>
              Explore the premium reusable components built for international student ROI analysis.
            </p>
          </header>

          <AlertBanner type="success" title="Milestone 3 Complete" onClose={() => {}}>
            All 15 shared components have been successfully built and integrated into the design system.
          </AlertBanner>

          {/* Section: Data Visuals */}
          <section style={{ marginTop: 'var(--space-16)' }}>
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Data Visuals & Stats</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-8)' }}>
              <div className="glass-panel glass-card flex-center" style={{ padding: 'var(--space-8)' }}>
                <ROIScoreRing score={85} size={220} />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <StatCard 
                  label="Average Yearly ROI" 
                  value="12.4%" 
                  trend="2.1%" 
                  trendDirection="up" 
                  subtitle="vs Global Avg" 
                />
                <StatCard 
                  label="Payback Period" 
                  value="3.8 Yrs" 
                  trend="0.5" 
                  trendDirection="down" 
                  subtitle="Est. Debt Relief" 
                />
              </div>

              <div className="glass-panel glass-card" style={{ padding: 'var(--space-8)' }}>
                <h3>Progress Tracks</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
                  <ProgressBar progress={65} label="Savings Goal" value="$32,500 / $50k" />
                  <ProgressBar progress={30} label="Loan Repayment" value="$12k / $40k" variant="amber" />
                  <ProgressBar progress={90} label="Visa Readiness" value="90% Complete" variant="teal" />
                </div>
              </div>
            </div>
          </section>

          {/* Section: Complex Widgets */}
          <section style={{ marginTop: 'var(--space-16)' }}>
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Compare & Pathway</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-8)' }}>
              <ComparisonTable data={comparisonData} />
              <div className="glass-panel glass-card" style={{ padding: 'var(--space-8)' }}>
                <h3 style={{ marginBottom: 'var(--space-8)' }}>US Pathway Timeline</h3>
                <TimelineStep steps={visaSteps} currentStepIndex={1} />
              </div>
            </div>
          </section>

          {/* Section: Interaction Atoms */}
          <section style={{ marginTop: 'var(--space-16)' }}>
            <h2 style={{ marginBottom: 'var(--space-8)' }}>Interactive Atoms</h2>
            <div className="glass-panel" style={{ padding: 'var(--space-8)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-12)' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <h4>Buttons & Badges</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
                  <Button variant="primary" icon={Plus}>Calculate ROI</Button>
                  <Button variant="outline" icon={Download}>Export Report</Button>
                  <Button variant="secondary">Cancel</Button>
                  <Button variant="ghost">Learn More</Button>
                  <Button variant="primary" isLoading={isLoading} onClick={handleAsyncAction}>Async Action</Button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  <Badge variant="excellent">Excellent</Badge>
                  <Badge variant="good">Good</Badge>
                  <Badge variant="warning">Moderate</Badge>
                  <Badge variant="danger">High Risk</Badge>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <h4>Inputs & Selection</h4>
                <InputField 
                  label="Target Annual Salary" 
                  prefix="$" 
                  placeholder="85,000" 
                  hint="Enter expected starting salary post-graduation"
                />
                <SelectField 
                  label="Select Destination" 
                  options={[
                    { value: 'usa', label: 'United States' },
                    { value: 'can', label: 'Canada' },
                    { value: 'ger', label: 'Germany' },
                  ]} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                <h4>Dynamic Sliders</h4>
                <RangeSlider 
                  label="Study Loan Amount" 
                  min={10000} 
                  max={150000} 
                  step={500} 
                  value={loanValue} 
                  onChange={(e) => setLoanValue(parseInt(e.target.value))} 
                  prefix="$"
                />
                <Button variant="outline" onClick={() => setIsModalOpen(true)}>Open Interaction Modal</Button>
              </div>

            </div>
          </section>

        </div>
      </main>

      {/* Global Elements */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Adjust Scenarios"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Dismiss</Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>Save Changes</Button>
          </>
        }
      >
        <p className="text-secondary" style={{ marginBottom: 'var(--space-6)' }}>
          Modify the baseline assumptions for your ROI calculation below.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <InputField label="Living Expenses (Monthly)" prefix="$" placeholder="1,500" />
          <RangeSlider label="Interest Rate" min={1} max={15} step={0.1} value={8.5} suffix="%" />
        </div>
      </Modal>

      {isLoading && <LoadingSpinner fullPage message="Processing Financial Engine..." />}
    </div>
  );
}

export default App;
