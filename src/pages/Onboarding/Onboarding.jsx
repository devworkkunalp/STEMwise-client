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
    intakeTerm: 'Fall 2026',
    university: '',
    tuition: 45000,
    livingCost: 18000,
    loanAmount: 52000,
    loanType: 'Federal Unsubsidized (7.94%)',
    visaPathway: 'OPT → H-1B (Standard)',
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
        intakeTerm: formData.intakeTerm,
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
    // Simple mock ROI calculation for live preview
    if (step < 2) return { score: 0, payback: '—', status: 'empty' };
    
    const annualTotal = formData.tuition + formData.livingCost;
    const totalInvest = annualTotal * 2;
    const annualRepay = (formData.loanAmount / 10) + (formData.loanAmount * 0.08); // simple linear + interest
    const netTakeHome = (formData.targetSalary * 0.7) - annualRepay;
    
    const payback = (totalInvest / (formData.targetSalary * 0.4)).toFixed(1);
    const score = Math.round(Math.max(30, 85 - (formData.loanAmount / 1500) + (formData.targetSalary / 5000)));
    
    let status = 's-mid';
    if (score > 80) status = 's-high';
    if (score < 50) status = 's-low';

    return { 
      score: Math.min(98, score), 
      payback: `${payback} yrs`,
      status
    };
  }, [formData, step]);

  const steps = [
    { n: 1, label: "Your Profile", sub: "Benchmark basics" },
    { n: 2, label: "University", sub: "Degrees & Costs" },
    { n: 3, label: "Loan Structure", sub: "Lender analysis" },
    { n: 4, label: "Visa Pathway", sub: "Legal modeling" },
    { n: 5, label: "Salary Outcome", sub: "The bottom line" }
  ];

  return (
    <div className="ob-shell animate-fade-in">
      {/* Left panel */}
      <div className="ob-left">
        <div className="ol-logo">STEMwise</div>
        <div className="ol-top">
          <div className="ol-eyebrow">Step {step} of 5</div>
          <div className="ol-title">
            {step === 1 && "Tell us about yourself"}
            {step === 2 && "Where will you study?"}
            {step === 3 && "How are you funding it?"}
            {step === 4 && "What's your stay plan?"}
            {step === 5 && "Salary & Review"}
          </div>
          <div className="ol-sub">
            {step === 1 && "Your nationality and field determine salary benchmarks and visa pathways we apply to your profile."}
            {step === 2 && "We auto-fill tuition and cost of living from the US College Scorecard database — 4,600+ programs."}
            {step === 3 && "We model your real repayment timeline — including interest — against your expected OPT salary."}
            {step === 4 && "Your visa pathway determines your earnings runway and how quickly you can repay the loan."}
            {step === 5 && "Opportunity cost is your #1 hidden expense. We benchmark your future gain vs staying home."}
          </div>
          <div className="roi-preview">
            <div className="rp-label">Live ROI preview</div>
            <div className={`rp-score ${step === 1 ? 'empty' : liveROI.status}`} id="ob-score">
              {step === 1 ? '— —' : liveROI.score}
            </div>
            <div className={`rp-sub ${step === 1 ? 'empty-sub' : ''}`} id="ob-sub" style={{ color: step === 1 ? 'rgba(255,255,255,.15)' : 'var(--teal)' }}>
              {step === 1 ? 'Complete setup to unlock your score' : `Payback · ${liveROI.payback} at current inputs`}
            </div>
            <div className="rp-bar"><div className="rp-fill" style={{ width: `${liveROI.score}%` }}></div></div>
          </div>
        </div>
        <div className="steps-nav">
          {steps.map((s, idx) => (
            <div key={idx} className={`step-item ${step === s.n ? 's-active' : step > s.n ? 's-done' : 's-todo'}`}>
              <div className="si-dot">{step > s.n ? '✓' : s.n}</div>
              <div>
                <div className="si-label">{s.label}</div>
                <div className="si-sub">{step === s.n ? s.sub : ''}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="ob-right">
        <div className="ob-topbar">
          <div className="ob-tb-step">STEP {step} OF 5 — {steps[step-1].label.toUpperCase()} SETUP</div>
          {step === 2 && <div style={{ fontSize: '10px', color: 'var(--hint)', fontFamily: 'var(--fm)' }}>Data from US College Scorecard · Monthly refresh</div>}
          {step === 3 && <div style={{ fontSize: '10px', color: 'var(--hint)', fontFamily: 'var(--fm)' }}>Lender-neutral · No affiliate fees</div>}
          {step === 4 && <div style={{ fontSize: '10px', color: 'var(--hint)', fontFamily: 'var(--fm)' }}>Data from DOL + USCIS · Feb 2026 wage-based system</div>}
          {step === 1 && <button className="btn-back" onClick={() => (window.location.href = '/signup')}>← Back to sign up</button>}
        </div>
        <div className="ob-progress"><div className="ob-prog-fill" style={{ width: `${(step / totalSteps) * 100}%` }}></div></div>
        
        <div className="ob-body">
          {step === 1 && (
            <div className="animate-slide-up">
              <div className="ob-step-title">Let's set up your profile</div>
              <div className="ob-step-sub">This takes about 30 seconds. We use your nationality and field to pull the right salary benchmarks and visa data.</div>

              <div className="grid2">
                <div className="fg">
                  <label className="fl">Home country</label>
                  <select className="fi" value={formData.nationality} onChange={(e) => handleInputChange('nationality', e.target.value)}>
                    <option value="India">🇮🇳 India</option>
                    <option value="China">🇨🇳 China</option>
                    <option value="Nigeria">🇳🇬 Nigeria</option>
                    <option value="Brazil">🇧🇷 Brazil</option>
                    <option value="Vietnam">🇻🇳 Vietnam</option>
                  </select>
                </div>
                <div className="fg">
                  <label className="fl">Home currency</label>
                  <select className="fi" disabled value={formData.nationality === 'India' ? 'INR' : 'USD'}>
                    <option value="INR">🇮🇳 INR (₹)</option>
                    <option value="USD">🇺🇸 USD ($)</option>
                  </select>
                </div>
              </div>

              <div className="fg">
                <label className="fl">STEM field</label>
                <select className="fi" value={formData.stemField} onChange={(e) => handleInputChange('stemField', e.target.value)}>
                  <option value="Computer Science / AI">Computer Science / AI / Machine Learning</option>
                  <option value="Data Science">Data Science / Business Analytics</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Cybersecurity">Cybersecurity / Information Security</option>
                </select>
              </div>

              <div className="grid2">
                <div className="fg">
                  <label className="fl">Degree level</label>
                  <select className="fi" value={formData.degreeLevel} onChange={(e) => handleInputChange('degreeLevel', e.target.value)}>
                    <option value="Master's (MS/MEng)">Master's (MS / MEng)</option>
                    <option value="PhD">PhD / Doctoral</option>
                    <option value="Bachelor's">Bachelor's (BS / BA)</option>
                  </select>
                </div>
                <div className="fg">
                  <label className="fl">Target intake</label>
                  <select className="fi" value={formData.intakeTerm} onChange={(e) => handleInputChange('intakeTerm', e.target.value)}>
                    <option value="Fall 2026">Fall 2026</option>
                    <option value="Spring 2027">Spring 2027</option>
                  </select>
                </div>
              </div>

              <div className="chip chip-info" style={{ marginTop: '4px' }}>
                <span style={{ fontSize: '14px', flexShrink: 0 }}>ℹ️</span>
                <div>Your home country and field are used to set salary benchmarks, H-1B wage level thresholds, and home currency conversion. We never share this with lenders.</div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-slide-up">
              <div className="ob-step-title">Choose your university</div>
              <div className="ob-step-sub">Search and we'll auto-populate tuition, cost of living, and STEM OPT eligibility for your program.</div>

              <div className="fg">
                <label className="fl">Search university <span className="fl-hint">— type to search 4,600+ programs</span></label>
                <input className="fi" type="text" placeholder="e.g. Carnegie Mellon University" value={formData.university} onChange={(e) => handleInputChange('university', e.target.value)} />
              </div>

              <div className="grid3" style={{ marginBottom: '16px' }}>
                <div style={{ background: 'var(--n3)', borderRadius: '10px', padding: '12px', border: '.5px solid var(--bdr)' }}>
                  <div style={{ fontSize: '9px', fontFamily: 'var(--fm)', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--hint)', marginBottom: '4px' }}>Annual tuition</div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '20px', fontWeight: 700, color: 'var(--white)' }}>${formData.tuition.toLocaleString()}</div>
                  <div style={{ fontSize: '10px', color: 'var(--hint)', marginTop: '2px' }}>Intl student rate</div>
                </div>
                <div style={{ background: 'var(--n3)', borderRadius: '10px', padding: '12px', border: '.5px solid var(--bdr)' }}>
                  <div style={{ fontSize: '9px', fontFamily: 'var(--fm)', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--hint)', marginBottom: '4px' }}>Cost of living</div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '20px', fontWeight: 700, color: 'var(--white)' }}>${formData.livingCost.toLocaleString()}</div>
                  <div style={{ fontSize: '10px', color: 'var(--hint)', marginTop: '2px' }}>Estimated</div>
                </div>
                <div style={{ background: 'var(--n3)', borderRadius: '10px', padding: '12px', border: '.5px solid var(--bdr)' }}>
                  <div style={{ fontSize: '9px', fontFamily: 'var(--fm)', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--hint)', marginBottom: '4px' }}>Program length</div>
                  <div style={{ fontFamily: 'var(--fd)', fontSize: '20px', fontWeight: 700, color: 'var(--white)' }}>2 yrs</div>
                  <div style={{ fontSize: '10px', color: 'var(--hint)', marginTop: '2px' }}>STEM focus</div>
                </div>
              </div>

              <div className="chip chip-suc">
                <span style={{ fontSize: '14px', flexShrink: 0 }}>✅</span>
                <div><strong>STEM OPT Eligible</strong> This program qualifies for the 24-month STEM OPT extension after graduation — giving you 3 H-1B lottery entries instead of 1.</div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-slide-up">
              <div className="ob-step-title">Configure your loan</div>
              <div className="ob-step-sub">Drag the slider to set your loan amount, then choose a lender. We show all options neutrally.</div>

              <div className="fg">
                <label className="fl">Loan amount needed</label>
                <div className="slider-val">${formData.loanAmount.toLocaleString()}</div>
                <input type="range" min="0" max="150000" step="1000" value={formData.loanAmount} onChange={(e) => handleInputChange('loanAmount', parseInt(e.target.value))} />
                <div className="slider-range"><span>$0</span><span>$75,000</span><span>$150,000</span></div>
              </div>

              <div className="fg" style={{ marginTop: '16px' }}>
                <label className="fl">Choose lender</label>
                <div className="loan-grid">
                  <div className={`lc ${formData.loanType === 'Federal' ? 'sel' : ''}`} onClick={() => handleInputChange('loanType', 'Federal')}>
                    <div className="lc-name">Federal Grad PLUS</div>
                    <div className="lc-rate">8.08%</div>
                    <div style={{ fontSize: '10px', color: 'var(--hint)', marginTop: '4px' }}>US Citizens / Residents</div>
                  </div>
                  <div className={`lc ${formData.loanType === 'Prodigy' ? 'sel' : ''}`} onClick={() => handleInputChange('loanType', 'Prodigy')}>
                    <div className="lc-name">Prodigy Finance</div>
                    <div className="lc-rate">11.4%</div>
                    <div style={{ fontSize: '10px', color: 'var(--hint)', marginTop: '4px' }}>No Cosigner · Intl</div>
                  </div>
                  <div className={`lc ${formData.loanType === 'MPOWER' ? 'sel' : ''}`} onClick={() => handleInputChange('loanType', 'MPOWER')}>
                    <div className="lc-name">MPOWER Financing</div>
                    <div className="lc-rate">12.9%</div>
                    <div style={{ fontSize: '10px', color: 'var(--hint)', marginTop: '4px' }}>Fixed Rate · Global</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-slide-up">
              <div className="ob-step-title">What's your stay plan?</div>
              <div className="ob-step-sub">Select your primary visa pathway to model your earnings runway.</div>

              <div className="opt-grid">
                <div className={`opt-card ${formData.visaPathway === 'Standard' ? 'sel' : ''}`} onClick={() => handleInputChange('visaPathway', 'Standard')}>
                  <div className="oc-icon" style={{ background: 'var(--tlo)', color: 'var(--teal)' }}>1</div>
                  <div>
                    <div className="oc-title">Standard OPT → H-1B</div>
                    <div className="oc-sub">3 years of work authorization with lottery-based extension.</div>
                  </div>
                </div>
                <div className={`opt-card ${formData.visaPathway === 'O-1' ? 'sel' : ''}`} onClick={() => handleInputChange('visaPathway', 'O-1')}>
                  <div className="oc-icon" style={{ background: 'rgba(155,138,251,.1)', color: '#9B8AFB' }}>2</div>
                  <div>
                    <div className="oc-title">Exceptional Talent (O-1)</div>
                    <div className="oc-sub">Bypasses lottery for researchers and experts.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-slide-up">
              <div className="ob-step-title">Final Salary Outcome</div>
              <div className="ob-step-sub">Confirm your target post-MS salary to generate the final ROI baseline.</div>

              <div className="fg">
                <label className="fl">Expected OPT Salary (Annual)</label>
                <div className="slider-val">${formData.targetSalary.toLocaleString()}</div>
                <input type="range" min="60000" max="250000" step="5000" value={formData.targetSalary} onChange={(e) => handleInputChange('targetSalary', parseInt(e.target.value))} />
                <div className="slider-range"><span>$60K</span><span>$150K</span><span>$250K</span></div>
              </div>

              <div className="grid2" style={{ marginTop: '20px' }}>
                <div className="fg">
                  <label className="fl">Current Home Salary</label>
                  <div className="fi-prefix">
                    <span className="fi-prefix-sym">₹</span>
                    <input className="fi" type="number" value={formData.currentSalary} onChange={(e) => handleInputChange('currentSalary', parseInt(e.target.value))} />
                  </div>
                </div>
                <div className="fg">
                  <label className="fl">Experience Level</label>
                  <select className="fi" value={formData.experienceYears} onChange={(e) => handleInputChange('experienceYears', parseInt(e.target.value))}>
                    <option value={0}>Fresh Graduate</option>
                    <option value={2}>Early Career (1-3 yrs)</option>
                    <option value={5}>Experienced (5+ yrs)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="ob-footer">
          <button className="btn-back" onClick={prevStep} style={{ visibility: step === 1 ? 'hidden' : 'visible' }}>← Back</button>
          <button className="btn-next" onClick={step === 5 ? handleSubmit : nextStep} disabled={isSubmitting}>
             {step === 5 ? (isSubmitting ? 'Generating...' : 'Get My Report →') : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
};
;

export default Onboarding;
