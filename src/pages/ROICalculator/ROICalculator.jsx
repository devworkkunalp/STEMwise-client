import React, { useState, useEffect, useCallback } from 'react';
import { 
  GraduationCap, 
  Wallet, 
  Briefcase, 
  Save, 
  Share2, 
  TrendingUp, 
  Info,
  Lightbulb
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import calculationService from '../../services/calculationService';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import BottomNav from '../../components/BottomNav/BottomNav';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import SelectField from '../../components/SelectField/SelectField';
import RangeSlider from '../../components/RangeSlider/RangeSlider';
import ROIScoreRing from '../../components/ROIScoreRing/ROIScoreRing';
import StatCard from '../../components/StatCard/StatCard';
import Badge from '../../components/Badge/Badge';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import './ROICalculator.css';

const ROICalculator = () => {
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('calculator');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Calculator State
  const [formData, setFormData] = useState({
    universityName: profile?.targetUniversity || '',
    programName: profile?.degreeName || '',
    annualTuition: profile?.annualTuition || 45000,
    annualLivingCost: profile?.annualLivingCost || 20000,
    programDurationYears: profile?.programDurationYears || 2,
    loanAmount: profile?.loanAmount || 50000,
    interestRate: profile?.loanInterestRate || 10.5,
    targetRole: 'Software Engineer',
    targetCity: 'San Francisco, CA',
    expectedSalary: 120000
  });

  const [roiResult, setRoiResult] = useState(null);

  // Debounced Calculation
  const runCalculation = useCallback(async (data) => {
    setIsLoading(true);
    try {
      // Mocking the call to calculation engine
      // In production, this calls the .NET backend
      const result = await calculationService.calculateROI({
        userId: user?.id,
        ...data
      });
      setRoiResult(result);
    } catch (err) {
      console.error("Calculation failed", err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    const timer = setTimeout(() => {
      runCalculation(formData);
    }, 500);
    return () => clearTimeout(timer);
  }, [formData, runCalculation]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call to save scenario
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Scenario saved to your profile!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="sw-app-root">
      <Navbar isAuthenticated={true} user={user} />
      
      <div className="sw-calculator-page">
        <Sidebar activeTab="calculator" onTabChange={(id) => setActiveTab(id)} profile={profile} />
        
        <main className="sw-calculator-container">
          {/* Left Panel: Inputs */}
          <div className="sw-calculator-inputs">
            <header className="sw-calc-header sw-calc-fade-in">
              <Badge variant="primary">ROI Simulator</Badge>
              <h1 className="text-gradient">Financial Sandbox</h1>
              <p className="text-secondary">Adjust your variables to see how they impact your 10-year ROI.</p>
            </header>

            {/* Section 1: Education */}
            <section className="sw-calculator-section glass-panel sw-calc-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="sw-section-header">
                <div className="sw-section-icon"><GraduationCap size={18} /></div>
                <h3>Education Costs</h3>
              </div>
              <div className="sw-input-grid">
                <InputField 
                  label="University" 
                  value={formData.universityName} 
                  onChange={(v) => handleInputChange('universityName', v)}
                  placeholder="e.g. Carnegie Mellon"
                />
                <InputField 
                  label="Program" 
                  value={formData.programName} 
                  onChange={(v) => handleInputChange('programName', v)}
                  placeholder="e.g. MS in Computer Science"
                />
                <InputField 
                  label="Annual Tuition (USD)" 
                  type="number"
                  value={formData.annualTuition} 
                  onChange={(v) => handleInputChange('annualTuition', parseFloat(v))}
                  prefix="$"
                />
                <InputField 
                  label="Duration (Years)" 
                  type="number"
                  value={formData.programDurationYears} 
                  onChange={(v) => handleInputChange('programDurationYears', parseFloat(v))}
                />
              </div>
            </section>

            {/* Section 2: Financing */}
            <section className="sw-calculator-section glass-panel sw-calc-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="sw-section-header">
                <div className="sw-section-icon"><Wallet size={18} /></div>
                <h3>Financing & Loans</h3>
              </div>
              <RangeSlider 
                label="Education Loan (Total)" 
                min={0} 
                max={200000} 
                step={5000} 
                value={formData.loanAmount} 
                onChange={(v) => handleInputChange('loanAmount', v)}
                formatValue={(v) => `$${v.toLocaleString()}`}
              />
              <div className="sw-input-grid" style={{ marginTop: 'var(--space-2)' }}>
                <InputField 
                  label="Interest Rate (%)" 
                  type="number"
                  value={formData.interestRate} 
                  onChange={(v) => handleInputChange('interestRate', parseFloat(v))}
                  suffix="%"
                />
                <InputField 
                  label="Annual Living Cost" 
                  type="number"
                  value={formData.annualLivingCost} 
                  onChange={(v) => handleInputChange('annualLivingCost', parseFloat(v))}
                  prefix="$"
                />
              </div>
            </section>

            {/* Section 3: Post-Graduation */}
            <section className="sw-calculator-section glass-panel sw-calc-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="sw-section-header">
                <div className="sw-section-icon"><Briefcase size={18} /></div>
                <h3>Career Expectations</h3>
              </div>
              <div className="sw-input-grid">
                <SelectField 
                  label="Target Role" 
                  options={[
                    { value: 'Software Engineer', label: 'Software Engineer' },
                    { value: 'Data Scientist', label: 'Data Scientist' },
                    { value: 'Product Manager', label: 'Product Manager' },
                    { value: 'UX Designer', label: 'UX Designer' }
                  ]}
                  value={formData.targetRole}
                  onChange={(v) => handleInputChange('targetRole', v)}
                />
                <InputField 
                  label="Expected Base Salary" 
                  type="number"
                  value={formData.expectedSalary} 
                  onChange={(v) => handleInputChange('expectedSalary', parseFloat(v))}
                  prefix="$"
                />
              </div>
            </section>
          </div>

          {/* Right Panel: Results */}
          <aside className="sw-calculator-results">
            <div className="sw-calculator-section glass-panel sw-calc-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="sw-results-card">
                <ROIScoreRing 
                  score={roiResult?.roiScore || 0} 
                  size={200}
                  isLoading={isLoading}
                />
                
                <div className="sw-roi-narrative">
                  <p>
                    {roiResult?.roiScore > 70 
                      ? "This scenario shows a Strong ROI. Your expected earnings significantly outweigh the investment within 3.5 years."
                      : "This is a Moderate ROI scenario. Consider reducing loan amounts or targeting higher-paying metros to optimize payback."}
                  </p>
                </div>

                <div className="sw-results-stats">
                  <StatCard 
                    label="Total Investment" 
                    value={`$${(formData.annualTuition * formData.programDurationYears + formData.annualLivingCost * formData.programDurationYears).toLocaleString()}`}
                    subtitle="Tuition + Living + Interest"
                  />
                  <StatCard 
                    label="Payback Period" 
                    value={`${roiResult?.paybackPeriodYears || '0.0'} Years`}
                    trend={roiResult?.paybackPeriodYears < 3 ? 'up' : 'down'}
                    subtitle="Time to break even"
                  />
                </div>

                <div className="flex-center" style={{ gap: 'var(--space-3)', width: '100%', marginTop: 'var(--space-2)' }}>
                  <Button variant="primary" icon={Save} onClick={handleSave} disabled={isSaving} style={{ flex: 1 }}>
                    {isSaving ? 'Saving...' : 'Save Scenario'}
                  </Button>
                  <Button variant="outline" icon={Share2} style={{ width: '48px' }} />
                </div>
              </div>
            </div>

            {/* Optimization Tip */}
            <div className="glass-panel sw-calc-fade-in" style={{ padding: 'var(--space-4)', animationDelay: '500ms', borderLeft: '4px solid var(--color-teal)' }}>
              <div className="flex" style={{ gap: 'var(--space-3)' }}>
                <Lightbulb className="text-teal" size={20} />
                <div>
                  <h4 style={{ margin: '0 0 var(--space-1) 0', fontSize: 'var(--font-size-body-sm)', fontWeight: 600 }}>Optimization Tip</h4>
                  <p className="text-secondary" style={{ fontSize: '12px', margin: 0 }}>
                    Switching to a Public University could increase your ROI score by 12 points and reduce payback by 8 months.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </main>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={(id) => setActiveTab(id)} />
    </div>
  );
};

export default ROICalculator;
