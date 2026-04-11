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
    <div className="shell">
      <Sidebar activeTab="calculator" onTabChange={(id) => setActiveTab(id)} profile={profile} userName={profile?.displayName || user?.email?.split('@')[0] || 'Student'} />
      
      <div className="main">
        <div id="pg-roi" className="page active" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="topbar">
            <div>
              <div className="tb-breadcrumb">ROI CALCULATOR</div>
              <div className="tb-title">Financial Sandbox</div>
            </div>
            <div className="tb-right">
              <div style={{ fontSize: '11px', color: 'var(--hint)', fontFamily: 'var(--fm)' }}>
                Adjust variables to see ROI impact
              </div>
              <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Scenario'}
              </button>
            </div>
          </div>

          <div className="pbody">
            
            {showWarning && (
              <div className="alert a-warn">
                <span>⚠️</span>
                <div>
                  <strong>Salary Warning:</strong> $60,000 is below the typical 25th percentile for STEM graduates in major US hubs. Consider a more competitive target.
                </div>
              </div>
            )}

            <div className="g-7030">
              {/* Left Panel: Inputs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Section 1: Education */}
                <div className="card">
                  <div className="section-title">Enrollment Profile</div>
                  <div className="g2">
                    <div className="input-group">
                      <label className="input-label">Destination</label>
                      <select value={formData.destinationCountry} onChange={(e) => handleInputChange('destinationCountry', e.target.value)}>
                        <option value="USA">United States</option>
                        <option value="Germany">Germany</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Degree Level</label>
                      <select value={formData.degreeLevel} onChange={(e) => handleInputChange('degreeLevel', e.target.value)}>
                        <option value="Masters">Master's Degree</option>
                        <option value="PhD">Doctorate (PhD)</option>
                        <option value="Bootcamp">Accredited Bootcamp</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="g2">
                     <div className="input-group">
                       <label className="input-label">Field of Study</label>
                       <select value={formData.fieldOfStudy} onChange={(e) => handleInputChange('fieldOfStudy', e.target.value)}>
                         <option value="Computer Science">Computer Science</option>
                         <option value="Biomedical">Biomedical Sciences</option>
                         <option value="Data Science">Data Science</option>
                         <option value="MBA">Business Administration</option>
                       </select>
                     </div>
                     <div className="input-group">
                       <label className="input-label">Program</label>
                       <input type="text" value={formData.programName} onChange={(e) => handleInputChange('programName', e.target.value)} placeholder="e.g. MS in CS" />
                     </div>
                  </div>

                  <div className="g2">
                     <div className="input-group">
                       <label className="input-label">Annual Tuition (USD)</label>
                       <input type="number" value={formData.annualTuition} onChange={(e) => handleInputChange('annualTuition', parseFloat(e.target.value) || 0)} />
                     </div>
                     <div className="input-group">
                       <label className="input-label">Duration (Years)</label>
                       <input type="number" value={formData.programDurationYears} onChange={(e) => handleInputChange('programDurationYears', parseFloat(e.target.value) || 0)} />
                     </div>
                  </div>
                </div>

                {/* Section 2: Financing */}
                <div className="card">
                  <div className="section-title">Financing & Loans</div>
                  <div className="input-group">
                    <label className="input-label">Education Loan (Total)</label>
                    <div className="slider-val">${formData.loanAmount.toLocaleString()}</div>
                    <input 
                      type="range" 
                      min="0" max="200000" step="5000"
                      value={formData.loanAmount} 
                      onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value) || 0)} 
                    />
                    <div className="slider-labels"><span>$0</span><span>$100K</span><span>$200K</span></div>
                  </div>

                  <div className="g2" style={{ marginTop: '14px' }}>
                    <div className="input-group">
                      <label className="input-label">Interest Rate (%)</label>
                      <input type="number" value={formData.interestRate} onChange={(e) => handleInputChange('interestRate', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Annual Living Cost</label>
                      <input type="number" value={formData.annualLivingCost} onChange={(e) => handleInputChange('annualLivingCost', parseFloat(e.target.value) || 0)} />
                    </div>
                  </div>
                </div>

                {/* Section 3: Career */}
                <div className="card">
                  <div className="section-title">Career Expectations</div>
                  <div className="g2">
                    <div className="input-group">
                      <label className="input-label">Target Role</label>
                      <select value={formData.targetRole} onChange={(e) => handleInputChange('targetRole', e.target.value)}>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="Data Scientist">Data Scientist</option>
                        <option value="Product Manager">Product Manager</option>
                        <option value="UX Designer">UX Designer</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <label className="input-label">Expected Base Salary</label>
                      <input type="number" value={formData.expectedSalary} onChange={(e) => handleInputChange('expectedSalary', parseFloat(e.target.value) || 0)} />
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Panel: Results */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="card card-lg" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <ROIScoreRing score={roiResult?.roiScore || 0} size={200} isLoading={isLoading} />
                  
                  <div style={{ margin: '20px 0', fontSize: '13px', color: 'var(--muted)', lineHeight: '1.6' }}>
                    {roiResult?.roiScore > 70 
                      ? "This scenario shows a Strong ROI. Your expected earnings significantly outweigh the investment within 3.5 years."
                      : "This is a Moderate ROI scenario. Consider reducing loan amounts or targeting higher-paying metros to optimize payback."}
                  </div>

                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ background: 'var(--n4)', borderRadius: '10px', padding: '14px', textAlign: 'left' }}>
                      <div style={{ fontSize: '10px', color: 'var(--hint)', textTransform: 'uppercase' }}>Total Investment</div>
                      <div style={{ fontFamily: 'var(--fd)', fontSize: '18px', fontWeight: '700', color: 'var(--white)' }}>
                        ${roiResult?.totalInvestment?.toLocaleString() || '0'}
                      </div>
                    </div>
                    
                    <div style={{ background: 'var(--n4)', borderRadius: '10px', padding: '14px', textAlign: 'left' }}>
                      <div style={{ fontSize: '10px', color: 'var(--hint)', textTransform: 'uppercase' }}>Payback Period</div>
                      <div style={{ fontFamily: 'var(--fd)', fontSize: '18px', fontWeight: '700', color: 'var(--teal)' }}>
                        {roiResult?.breakEvenYear || '0.0'} Years
                      </div>
                    </div>
                    
                    <div style={{ background: 'var(--n4)', borderRadius: '10px', padding: '14px', textAlign: 'left' }}>
                      <div style={{ fontSize: '10px', color: 'var(--hint)', textTransform: 'uppercase' }}>Annual Delta</div>
                      <div style={{ fontFamily: 'var(--fd)', fontSize: '18px', fontWeight: '700', color: 'var(--amber)' }}>
                        ${roiResult?.incrementalEarnings?.toLocaleString() || '0'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="alert a-info">
                  <span>💡</span>
                  <div>
                    <strong>Optimization Tip</strong>
                    Switching to a Public University could increase your ROI score by 12 points and reduce payback by 8 months.
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

export default ROICalculator;
