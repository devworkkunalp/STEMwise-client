import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Target,
  Rocket
} from 'lucide-react';
import Button from '../../components/Button/Button';
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
        degreeLevel: 1, 
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

  const liveROI = useMemo(() => {
    const totalCost = (formData.tuition + formData.livingCost) * 2;
    const payback = (totalCost / (formData.targetSalary * 0.4)).toFixed(1);
    const score = Math.round(75 - (formData.loanAmount / 10000) * 2 + (formData.targetSalary / 10000));
    return { score: Math.min(98, score), payback };
  }, [formData]);

  const stepInfo = {
    1: { title: "Tell us about yourself", desc: "We use your nationality and field to benchmark against students with similar profiles.", context: "Identity" },
    2: { title: "Where are you heading?", desc: "Institution prestige and location significantly impact your first-year salary outcomes.", context: "Destination" },
    3: { title: "How are you funding it?", desc: "We model your real repayment timeline based on your future OPT salary.", context: "Finances" },
    4: { title: "Target Outcome", desc: "Living costs in hubs like NYC or SF require a higher salary buffer to maintain ROI.", context: "Career" },
    5: { title: "Final Baseline", desc: "Your current opportunity cost is the #1 hidden expense of your STEM degree.", context: "Baseline" }
  };

  const currentInfo = stepInfo[step];

  return (
    <div className="onboarding-2panel-root">
      <div className="onboarding-glass-container animate-fade-in">
        
        {/* Left Side: Intelligence & Feedback */}
        <div className="onboarding-left-panel">
          <div className="panel-header">
            <span className="step-count-teal">Phase {step} of {totalSteps}</span>
            <h1 className="syne-headline text-gradient">{currentInfo.title}</h1>
            <p className="panel-desc">{currentInfo.desc}</p>
          </div>

          <div className="live-preview-widget">
             <span className="live-tag">LIVE ROI PULSE</span>
             <div className="preview-metrics">
                <div className="metric-main">
                   <span className="metric-value">{liveROI.score}</span>
                   <span className="metric-label">ROI Score</span>
                </div>
                <div className="metric-sub">
                   Estimated Payback: <strong>{liveROI.payback} years</strong>
                </div>
             </div>
          </div>
          
          <div className="panel-footer" style={{marginTop: 'auto', paddingTop: '20px'}}>
             <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal)', fontSize: '11px', fontWeight: 700, letterSpacing: '1px'}}>
                <Target size={14} />
                <span>MAPPING: {currentInfo.context.toUpperCase()}</span>
             </div>
          </div>
        </div>

        {/* Right Side: Navigation & Inputs */}
        <div className="onboarding-right-panel">
          <div className="form-container">
            <div className="step-progress-dashes">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className={`dash ${i <= step ? 'is-active' : ''}`} />
               ))}
            </div>

            <div className="form-content-area">
               {step === 1 && (
                 <div className="form-step animate-slide-up">
                    <SelectField 
                      label="Home Country" 
                      options={[{value: 'India', label: 'India'}, {value: 'China', label: 'China'}, {value: 'USA', label: 'USA'}]} 
                      value={formData.nationality}
                      onChange={(e) => handleInputChange('nationality', e.target.value)}
                    />
                    <SelectField 
                      label="Target STEM Field" 
                      options={[{value: 'Computer Science / AI', label: 'Computer Science / AI'}, {value: 'Data Science', label: 'Data Science'}, {value: 'Cybersecurity', label: 'Cybersecurity'}]} 
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
                 <div className="form-step animate-slide-up">
                    <InputField 
                      label="Target University" 
                      placeholder="e.g. Stanford University" 
                      value={formData.university}
                      onChange={(e) => handleInputChange('university', e.target.value)}
                    />
                    <div className="grid-2">
                      <InputField 
                          label="MS Tuition (USD/Year)" 
                          type="number" 
                          value={formData.tuition}
                          onChange={(e) => handleInputChange('tuition', parseInt(e.target.value))}
                      />
                      <InputField 
                          label="Living Exp (USD/Year)" 
                          type="number" 
                          value={formData.livingCost}
                          onChange={(e) => handleInputChange('livingCost', parseInt(e.target.value))}
                      />
                    </div>
                 </div>
               )}

               {step === 3 && (
                 <div className="form-step animate-slide-up">
                    <div className="label-with-value">
                       <span className="field-label">Loan Amount Required</span>
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
                          {value: 'Collateralized (9.2%)', label: 'Collateralized (9.2%)'}
                      ]} 
                      value={formData.loanType}
                      onChange={(e) => handleInputChange('loanType', e.target.value)}
                    />
                 </div>
               )}

               {step === 4 && (
                  <div className="form-step animate-slide-up">
                     <SelectField 
                      label="Target Metro Area" 
                      options={[{value: 'New York City', label: 'New York City / NJ'}, {value: 'San Francisco', label: 'San Francisco / SV'}, {value: 'Austin', label: 'Austin, TX'}]} 
                      value={formData.targetCity}
                      onChange={(e) => handleInputChange('targetCity', e.target.value)}
                    />
                    <div className="label-with-value">
                       <span className="field-label">Expected Annual Salary</span>
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
                  <div className="form-step animate-slide-up">
                     <InputField 
                          label="Current Local Salary (Annual)" 
                          type="number" 
                          value={formData.currentSalary}
                          onChange={(e) => handleInputChange('currentSalary', parseInt(e.target.value))}
                          hint="Essential for opportunity cost and net-worth gain analysis."
                      />
                      <SelectField 
                          label="Current Experience" 
                          options={[{value: 2, label: 'Early Career (1-3 Years)'}, {value: 5, label: 'Experienced (5+ Years)'}, {value: 0, label: 'University Student'}]} 
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
                  icon={Rocket}
                 >
                    Establish Final Baseline
                 </Button>
               ) : (
                 <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth 
                  className="btn-onboarding-teal"
                  onClick={nextStep}
                 >
                    Proceed to Next Phase →
                 </Button>
               )}
               
               {step > 1 && (
                 <button className="btn-onboarding-back" onClick={prevStep}>
                    Return to previous phase
                 </button>
               )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Onboarding;
