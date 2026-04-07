import React, { useState, useEffect, useMemo } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Rocket, 
  Globe, 
  GraduationCap, 
  Wallet, 
  CheckCircle,
  Building2,
  Target,
  ArrowRight,
  TrendingUp,
  Briefcase
} from 'lucide-react';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import InputField from '../../components/InputField/InputField';
import SelectField from '../../components/SelectField/SelectField';
import RangeSlider from '../../components/RangeSlider/RangeSlider';
import profileService from '../../services/profileService';
import { useAuth } from '../../context/AuthContext';
import './Onboarding.css';

const Onboarding = ({ onComplete }) => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // New Design State
  const [formData, setFormData] = useState({
    nationality: 'India',
    stemField: 'Computer Science / AI',
    degreeLevel: 'Master\'s (MS/MEng)',
    university: '',
    tuition: 45000,
    livingCost: 18000,
    loanAmount: 52000,
    loanType: 'Federal Unsubsidized (7.94%)',
    repaymentTerm: 10,
    targetCity: 'New York City',
    targetSalary: 115000,
    currentSalary: 15000,
    experienceYears: 2
  });

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await profileService.upsertProfile({
        displayName: user?.name || 'Student',
        nationality: formData.nationality,
        homeCurrency: formData.nationality === 'India' ? 'INR' : 'USD',
        stemField: formData.stemField,
        degreeLevel: 1, // Default to MS
        intakeTerm: 'Fall 2026',
        targetSalary: formData.targetSalary,
        currentSalary: formData.currentSalary,
        annualTuition: formData.tuition,
        annualLivingCost: formData.livingCost,
        loanAmount: formData.loanAmount
      });
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Onboarding failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock Live ROI Calculation for the Teaser
  const liveROI = useMemo(() => {
    const totalCost = (formData.tuition + formData.livingCost) * 2;
    const payback = (totalCost / (formData.targetSalary * 0.4)).toFixed(1);
    const score = Math.round(75 - (formData.loanAmount / 10000) * 2 + (formData.targetSalary / 10000));
    return { score: Math.min(98, score), payback };
  }, [formData]);

  const stepInfo = {
    1: { 
        title: "Tell us about yourself", 
        desc: "We use your nationality and field to benchmark against students with similar profiles.",
        context: "Academic Profile"
    },
    2: { 
        title: "Where are you heading?", 
        desc: "Institution prestige and location significantly impact your first-year salary outcomes.",
        context: "Destination Strategy"
    },
    3: { 
        title: "How are you funding it?", 
        desc: "We model your real repayment timeline, including interest, on your OPT salary.",
        context: "Financial Plan"
    },
    4: { 
        title: "Target Outcome", 
        desc: "Living costs in hubs like NYC or SF require a higher salary buffer to maintain ROI.",
        context: "Career Target"
    },
    5: { 
        title: "Final Baseline", 
        desc: "Your current opportunity cost is the #1 hidden expense of your STEM degree.",
        context: "Wealth Summary"
    }
  };

  const currentInfo = stepInfo[step];

  return (
    <div className="onboarding-2panel-root">
      
      {/* LEFT PANEL: Context & Intelligence */}
      <div className="onboarding-left-panel">
        <div className="panel-content animate-fade-in">
          <span className="step-count-teal">
            STEP {step} OF {totalSteps}
          </span>
          <h1 className="syne-headline">{currentInfo.title}</h1>
          <p className="panel-desc">{currentInfo.desc}</p>

          <div className="live-preview-widget glass-panel">
             <span className="live-tag">LIVE PREVIEW</span>
             {step < 2 ? (
               <div className="preview-placeholder">
                  <div className="dash-row">
                    <div className="dash is-active" />
                    <div className="dash is-active" />
                  </div>
                  <p className="text-teal-muted">Complete setup to see your score</p>
               </div>
             ) : (
               <div className="preview-metrics animate-slide-up">
                  <div className="metric-main">
                     <span className="metric-value">{liveROI.score}</span>
                     <span className="metric-label">ROI Score</span>
                  </div>
                  <div className="metric-sub">
                     Payback: <strong>{liveROI.payback} years</strong> at current inputs
                  </div>
               </div>
             )}
          </div>
        </div>
        <div className="panel-footer-links">
           <span className="text-teal-label">YOUR {currentInfo.context.toUpperCase()}</span>
        </div>
      </div>

      {/* RIGHT PANEL: Focused Interaction */}
      <div className="onboarding-right-panel">
        <div className="form-container">
          
          {/* Progress Dashes */}
          <div className="step-progress-dashes">
             {[1,2,3,4,5].map(i => (
               <div 
                 key={i} 
                 className={`dash ${i < step ? 'is-complete' : i === step ? 'is-active' : ''}`} 
               />
             ))}
          </div>

          <div className="form-content-area">
             {step === 1 && (
               <div className="form-step animate-fade-in">
                  <SelectField 
                    label="Home Country" 
                    options={[{value: 'India', label: 'IN India'}, {value: 'China', label: 'CN China'}, {value: 'USA', label: 'US USA'}]} 
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                  />
                  <SelectField 
                    label="STEM Field" 
                    options={[{value: 'Computer Science / AI', label: 'Computer Science / AI'}, {value: 'Data Science', label: 'Data Science'}, {value: 'Mechanical Eng', label: 'Mechanical Engineering'}]} 
                    value={formData.stemField}
                    onChange={(e) => handleInputChange('stemField', e.target.value)}
                  />
                  <SelectField 
                    label="Degree Level" 
                    options={[{value: 'Master\'s (MS/MEng)', label: 'Master\'s (MS/MEng)'}, {value: 'PhD', label: 'Doctorate (PhD)'}]} 
                    value={formData.degreeLevel}
                    onChange={(e) => handleInputChange('degreeLevel', e.target.value)}
                  />
               </div>
             )}

             {step === 2 && (
               <div className="form-step animate-fade-in">
                  <InputField 
                    label="Target University" 
                    placeholder="e.g. Stanford University" 
                    value={formData.university}
                    onChange={(e) => handleInputChange('university', e.target.value)}
                  />
                  <div className="grid-2">
                    <InputField 
                        label="Annual Tuition (USD)" 
                        type="number" 
                        value={formData.tuition}
                        onChange={(e) => handleInputChange('tuition', parseInt(e.target.value))}
                    />
                    <InputField 
                        label="Living Cost (USD)" 
                        type="number" 
                        value={formData.livingCost}
                        onChange={(e) => handleInputChange('livingCost', parseInt(e.target.value))}
                    />
                  </div>
               </div>
             )}

             {step === 3 && (
               <div className="form-step animate-fade-in">
                  <div className="label-with-value">
                     <span className="field-label">Loan Amount</span>
                     <span className="field-value">${formData.loanAmount.toLocaleString()}</span>
                  </div>
                  <RangeSlider 
                    min={0} max={150000} step={1000} 
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', parseInt(e.target.value))}
                  />
                  <SelectField 
                    label="Loan Type" 
                    options={[
                        {value: 'Federal Unsubsidized (7.94%)', label: 'Federal Unsubsidized (7.94%)'},
                        {value: 'Private - No Cosigner (10.5%)', label: 'Private - No Cosigner (10.5%)'},
                        {value: 'India-Based Collateral (9.2%)', label: 'India-Based Collateral (9.2%)'}
                    ]} 
                    value={formData.loanType}
                    onChange={(e) => handleInputChange('loanType', e.target.value)}
                  />
                  <SelectField 
                    label="Repayment Term" 
                    options={[{value: 10, label: '10 Years'}, {value: 15, label: '15 Years'}]} 
                    value={formData.repaymentTerm}
                    onChange={(e) => handleInputChange('repaymentTerm', parseInt(e.target.value))}
                  />
               </div>
             )}

             {step === 4 && (
                <div className="form-step animate-fade-in">
                   <SelectField 
                    label="Target Metro Area" 
                    options={[{value: 'New York City', label: 'New York City'}, {value: 'San Francisco', label: 'San Francisco / SV'}, {value: 'Austin', label: 'Austin, TX'}]} 
                    value={formData.targetCity}
                    onChange={(e) => handleInputChange('targetCity', e.target.value)}
                  />
                  <div className="label-with-value">
                     <span className="field-label">Target Salary</span>
                     <span className="field-value">${formData.targetSalary.toLocaleString()}</span>
                  </div>
                   <RangeSlider 
                    min={60000} max={250000} step={5000} 
                    value={formData.targetSalary}
                    onChange={(e) => handleInputChange('targetSalary', parseInt(e.target.value))}
                  />
                </div>
             )}

             {step === 5 && (
                <div className="form-step animate-fade-in">
                   <InputField 
                        label="Current Salary (INR/Local)" 
                        type="number" 
                        value={formData.currentSalary}
                        onChange={(e) => handleInputChange('currentSalary', parseInt(e.target.value))}
                        hint="Used to calculate your degree opportunity cost."
                    />
                    <SelectField 
                        label="Work Experience" 
                        options={[{value: 2, label: '2-4 Years (Intermediate)'}, {value: 5, label: '5+ Years (Senior)'}, {value: 0, label: 'Fresher'}]} 
                        value={formData.experienceYears}
                        onChange={(e) => handleInputChange('experienceYears', parseInt(e.target.value))}
                    />
                </div>
             )}
          </div>

          <div className="form-actions-footer">
             {step === 5 ? (
               <Button 
                variant="primary" 
                size="lg" 
                fullWidth 
                className="btn-onboarding-teal"
                onClick={handleSubmit}
                isLoading={isSubmitting}
               >
                  Generate My Vision
               </Button>
             ) : (
               <Button 
                variant="primary" 
                size="lg" 
                fullWidth 
                className="btn-onboarding-teal"
                onClick={nextStep}
               >
                  Continue →
               </Button>
             )}
             
             {step > 1 && (
               <button className="btn-onboarding-back" onClick={prevStep}>
                  Back to previous step
               </button>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Onboarding;
