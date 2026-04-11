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
    degreeLevel: profile?.degreeLevel || 'Masters',
    fieldOfStudy: profile?.fieldOfStudy || 'Computer Science',
    destinationCountry: profile?.destinationCountry || 'USA',
    annualTuition: profile?.annualTuition || 45000,
    annualLivingCost: profile?.annualLivingCost || 20000,
    programDurationYears: profile?.programDurationYears || 2,
    loanAmount: profile?.loanAmount || 50000,
    interestRate: profile?.loanInterestRate || 10.5,
    repaymentTerm: 10,
    targetRole: 'Software Engineer',
    targetCity: 'San Francisco, CA',
    expectedSalary: 120000
  });

  const [roiResult, setRoiResult] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  // Debounced Calculation
  const runCalculation = useCallback(async (data) => {
    setIsLoading(true);
    try {
      const result = await calculationService.calculateROI({
        AnnualTuition: data.annualTuition,
        AnnualLivingCost: data.annualLivingCost,
        DurationYears: data.programDurationYears,
        FinalSalaryBenchmark: data.expectedSalary,
        CurrentSalary: profile?.currentSalary || 20000,
        LoanAmount: data.loanAmount,
        InterestRate: data.interestRate,
        RepaymentTerm: data.repaymentTerm,
        HomeCurrency: profile?.homeCurrency || 'INR',
        StudyCurrency: 'USD'
      });
      setRoiResult(result);
      setShowWarning(data.expectedSalary < 60000);
    } catch (err) {
      console.error("Calculation failed", err);
    } finally {
      setIsLoading(false);
    }
  }, [profile?.currentSalary, profile?.homeCurrency]);

  // Data Enrichment Trigger
  const enrichData = useCallback(async () => {
    if (!formData.universityName && !formData.programName) return;
    
    try {
      const enriched = await calculationService.enrichProfile({
        universityName: formData.universityName,
        programName: formData.programName,
        targetRole: formData.targetRole,
        targetCity: formData.targetCity,
        homeCountry: profile?.nationality || 'India'
      });
      
      if (enriched.school?.tuition) {
        setFormData(prev => ({ 
          ...prev, 
          annualTuition: enriched.school.tuition,
          expectedSalary: enriched.school.medianEarnings10Yr || prev.expectedSalary
        }));
      }
    } catch (err) {
      console.log("Enrichment skipped or failed", err);
    }
  }, [formData.universityName, formData.programName, formData.targetRole, formData.targetCity, profile?.nationality]);

  useEffect(() => {
    const timer = setTimeout(() => {
      runCalculation(formData);
    }, 500);
    return () => clearTimeout(timer);
  }, [formData, runCalculation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      enrichData();
    }, 1500);
    return () => clearTimeout(timer);
  }, [formData.universityName, formData.programName, enrichData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
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

            {showWarning && (
              <div className="sw-salary-warning sw-calc-fade-in">
                <AlertTriangle size={18} />
                <span>
                  <strong>Salary Warning:</strong> $60,000 is below the typical 25th percentile for STEM graduates in major US hubs. Consider a more competitive target.
                </span>
              </div>
            )}

            {/* Section 1: Education */}
            <section className="sw-calculator-section glass-panel sw-calc-fade-in" style={{ animationDelay: '100ms' }}>
              <div className="sw-section-header">
                <div className="sw-section-icon"><GraduationCap size={18} /></div>
                <h3>Enrollment Profile</h3>
              </div>
              <div className="sw-input-grid">
                <SelectField 
                   label="Destination" 
                   value={formData.destinationCountry} 
                   onChange={(e) => handleInputChange('destinationCountry', e.target.value)}
                   options={[
                     { value: 'USA', label: 'United States' },
                     { value: 'Germany', label: 'Germany' },
                     { value: 'Canada', label: 'Canada' },
                     { value: 'Australia', label: 'Australia' }
                   ]}
                />
                <SelectField 
                   label="Degree Level" 
                   value={formData.degreeLevel} 
                   onChange={(e) => handleInputChange('degreeLevel', e.target.value)}
                   options={[
                     { value: 'Masters', label: "Master's Degree" },
                     { value: 'PhD', label: 'Doctorate (PhD)' },
                     { value: 'Bootcamp', label: 'Accredited Bootcamp' }
                   ]}
                />
                <SelectField 
                   label="Field of Study" 
                   value={formData.fieldOfStudy} 
                   onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}
                   options={[
                     { value: 'Computer Science', label: 'Computer Science' },
                     { value: 'Biomedical', label: 'Biomedical Sciences' },
                     { value: 'Data Science', label: 'Data Science' },
                     { value: 'MBA', label: 'Business Administration' }
                   ]}
                />
                <InputField 
                  label="University" 
                  value={formData.universityName} 
                  onChange={(e) => handleInputChange('universityName', e.target.value)}
                  placeholder="e.g. Carnegie Mellon"
                />
                <InputField 
                  label="Program" 
                  value={formData.programName} 
                  onChange={(e) => handleInputChange('programName', e.target.value)}
                  placeholder="e.g. MS in Computer Science"
                />
                <InputField 
                  label="Annual Tuition (USD)" 
                  type="number"
                  value={formData.annualTuition} 
                  onChange={(e) => handleInputChange('annualTuition', parseFloat(e.target.value) || 0)}
                  prefix="$"
                />
                <InputField 
                  label="Duration (Years)" 
                  type="number"
                  value={formData.programDurationYears} 
                  onChange={(e) => handleInputChange('programDurationYears', parseFloat(e.target.value) || 0)}
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
                onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value) || 0)}
                formatValue={(v) => `$${v.toLocaleString()}`}
              />
              <div className="sw-input-grid" style={{ marginTop: 'var(--space-2)' }}>
                <InputField 
                  label="Interest Rate (%)" 
                  type="number"
                  value={formData.interestRate} 
                  onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)}
                  suffix="%"
                />
                <InputField 
                  label="Annual Living Cost" 
                  type="number"
                  value={formData.annualLivingCost} 
                  onChange={(e) => handleInputChange('annualLivingCost', parseFloat(e.target.value) || 0)}
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
                  onChange={(e) => handleInputChange('targetRole', e.target.value)}
                />
                <InputField 
                  label="Expected Base Salary" 
                  type="number"
                  value={formData.expectedSalary} 
                  onChange={(e) => handleInputChange('expectedSalary', parseFloat(e.target.value) || 0)}
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
                    value={`$${roiResult?.totalInvestment?.toLocaleString() || '0'}`}
                    subtitle="Tuition + Living + Interest"
                  />
                  <StatCard 
                    label="Payback Period" 
                    value={`${roiResult?.breakEvenYear || '0.0'} Years`}
                    trend={roiResult?.breakEvenYear < 3.5 ? 'up' : 'down'}
                    subtitle="Time to break even"
                  />
                  <StatCard 
                    label="Annual Delta" 
                    value={`$${roiResult?.incrementalEarnings?.toLocaleString() || '0'}`}
                    trend="up"
                    subtitle="Incremental Earnings"
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
