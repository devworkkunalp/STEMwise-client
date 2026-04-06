import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Rocket, Globe, GraduationCap, Wallet, CheckCircle } from 'lucide-react';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import InputField from '../../components/InputField/InputField';
import SelectField from '../../components/SelectField/SelectField';
import RangeSlider from '../../components/RangeSlider/RangeSlider';
import AlertBanner from '../../components/AlertBanner/AlertBanner';
import profileService from '../../services/profileService';
import './Onboarding.css';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    degreeLevel: 1, // 1: Masters (MS) - Matching Enum
    stemField: 'Computer Science',
    targetCountry: 'USA',
    university: '',
    savings: 10000,
    scholarship: 0,
    loanInterest: 8.5
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
        displayName: formData.displayName,
        nationality: formData.targetCountry,
        homeCurrency: 'INR',
        stemField: formData.stemField,
        degreeLevel: formData.degreeLevel,
        intakeTerm: 'Fall 2026',
        selectedUniversities: [] // Future: Link to University search
      });
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Onboarding submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="onboarding-step-content animate-fade-in">
            <GraduationCap className="step-icon text-gradient" size={48} />
            <h2>Academic Identity</h2>
            <p>Tell us about your educational background and goals.</p>
            <div className="onboarding-form">
              <InputField 
                label="Display Name" 
                placeholder="Arjun Patil" 
                value={formData.displayName}
                onChange={(e) => handleInputChange('displayName', e.target.value)}
              />
              <SelectField 
                label="Planned Degree" 
                options={[
                  { value: 'Masters', label: 'Masters (MS)' },
                  { value: 'PhD', label: 'Doctorate (PhD)' },
                  { value: 'MBA', label: 'Business (MBA)' },
                ]} 
                value={formData.degreeLevel}
                onChange={(e) => handleInputChange('degreeLevel', e.target.value)}
              />
              <InputField 
                label="Field of Specialization" 
                placeholder="e.g. Artificial Intelligence" 
                value={formData.stemField}
                onChange={(e) => handleInputChange('stemField', e.target.value)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="onboarding-step-content animate-fade-in">
            <Globe className="step-icon text-gradient" size={48} />
            <h2>Destination Goal</h2>
            <p>Where do you see yourself studying?</p>
            <div className="onboarding-grid">
               {['usa', 'germany', 'canada', 'uk'].map(country => (
                 <div 
                   key={country} 
                   className={`country-card ${formData.targetCountry === country ? 'active' : ''}`}
                   onClick={() => handleInputChange('targetCountry', country)}
                 >
                   <span className="country-emoji">
                     {country === 'usa' ? '🇺🇸' : country === 'germany' ? '🇩🇪' : country === 'canada' ? '🇨🇦' : '🇬🇧'}
                   </span>
                   <span className="country-name">{country.toUpperCase()}</span>
                 </div>
               ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="onboarding-step-content animate-fade-in">
            <Rocket className="step-icon text-gradient" size={48} />
            <h2>University Selection</h2>
            <p>Which institution are you targeting?</p>
            <div className="onboarding-form">
              <InputField 
                label="University Name" 
                placeholder="e.g. Stanford University" 
                value={formData.university}
                onChange={(e) => handleInputChange('university', e.target.value)}
                hint="We'll use this to estimate your tuition costs."
              />
              <div className="info-box">
                <p>💡 Tip: Top-tier universities often have higher initial costs but significantly higher ROI.</p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="onboarding-step-content animate-fade-in">
            <Wallet className="step-icon text-gradient" size={48} />
            <h2>Financial Profile</h2>
            <p>Let's map out your budget and funding.</p>
            <div className="onboarding-form">
               <RangeSlider 
                  label="Available Savings" 
                  min={0} 
                  max={100000} 
                  value={formData.savings}
                  onChange={(e) => handleInputChange('savings', parseInt(e.target.value))}
                  prefix="$"
               />
               <RangeSlider 
                  label="Expected Scholarship" 
                  min={0} 
                  max={50000} 
                  value={formData.scholarship}
                  onChange={(e) => handleInputChange('scholarship', parseInt(e.target.value))}
                  prefix="$"
               />
               <RangeSlider 
                  label="Anticipated Loan Interest" 
                  min={1} 
                  max={15} 
                  step={0.1}
                  value={formData.loanInterest}
                  onChange={(e) => handleInputChange('loanInterest', parseFloat(e.target.value))}
                  suffix="%"
               />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="onboarding-step-content animate-fade-in">
            <CheckCircle className="step-icon text-gradient" size={48} />
            <h2>Analysis Summary</h2>
            <p>You're ready to unlock your career projections.</p>
            <div className="summary-card glass-panel">
              <div className="summary-item">
                <span className="summary-label">Goal:</span>
                <span className="summary-value">{formData.degreeLevel} in {formData.stemField}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Destination:</span>
                <span className="summary-value">{formData.targetCountry.toUpperCase()}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Financials:</span>
                <span className="summary-value">${formData.savings.toLocaleString()} Savings | {formData.loanInterest}% Interest</span>
              </div>
            </div>
            <AlertBanner type="info" title="Final Step">
              Your profile will be used to generate a 10-year ROI projection.
            </AlertBanner>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="onboarding-page-root">
      <div className="onboarding-container glass-panel">
        <div className="onboarding-header">
          <Badge variant="excellent">Step {step} of {totalSteps}</Badge>
          <ProgressBar progress={(step / totalSteps) * 100} height="6px" variant="teal" />
        </div>

        <div className="onboarding-body">
          {renderStep()}
        </div>

        <div className="onboarding-footer">
          {step > 1 && (
            <Button variant="outline" icon={ChevronLeft} onClick={prevStep}>Back</Button>
          )}
          <div style={{ marginLeft: 'auto' }}>
            {step < totalSteps ? (
              <Button variant="primary" icon={ChevronRight} onClick={nextStep}>Next Step</Button>
            ) : (
              <Button variant="primary" icon={Rocket} onClick={handleSubmit} isLoading={isSubmitting}>Let's Go!</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
