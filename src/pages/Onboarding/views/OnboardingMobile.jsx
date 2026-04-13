import React from 'react';
import { 
  ArrowLeft,
  ChevronRight,
  Info
} from 'lucide-react';

/**
 * Mobile-Specific View for Onboarding funnel.
 * Features:
 * - Fixed progress bar at top
 * - Sticky ROI Pill for real-time feedback
 * - Simplified header/form
 */
const OnboardingMobile = ({
  step,
  totalSteps,
  formData,
  handleInputChange,
  steps,
  liveROI,
  prevStep,
  nextStep,
  handleSubmit,
  isSubmitting
}) => {
  return (
    <div className="ob-mobile-container animate-fade-in">
      {/* Top Header with Progress */}
      <div className="om-header">
        <div className="om-nav">
          <button className="om-back" onClick={prevStep} style={{ visibility: step === 1 ? 'hidden' : 'visible' }}>
            <ArrowLeft size={20} />
          </button>
          <div className="om-title">Step {step}: {steps[step-1].label}</div>
          <div className="om-placeholder" style={{ width: 20 }}></div>
        </div>
        <div className="om-progress">
          <div className="om-prog-fill" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
        </div>
      </div>

      {/* Sticky ROI Pill */}
      <div className="om-roi-pill">
        <div className="orp-content">
          <div className="orp-left">
            <span className="orp-label">EST. ROI SCORE</span>
            <span className={`orp-value ${step === 1 ? 'empty' : liveROI.status}`}>
              {step === 1 ? '--' : liveROI.score}
            </span>
          </div>
          <div className="orp-divider"></div>
          <div className="orp-right">
            <span className="orp-label">PAYBACK</span>
            <span className="orp-value">{step === 1 ? '--' : liveROI.payback}</span>
          </div>
        </div>
      </div>

      <div className="om-body">
        <div className="ob-step-title" style={{ fontSize: '22px', marginTop: '12px' }}>
          {step === 1 && "Tell us about yourself"}
          {step === 2 && "Where will you study?"}
          {step === 3 && "How are you funding it?"}
          {step === 4 && "What's your stay plan?"}
          {step === 5 && "Salary & Review"}
        </div>
        
        <div className="ob-body-content" style={{ marginTop: '20px' }}>
          {step === 1 && (
            <div className="animate-slide-up">
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
                <label className="fl">STEM field</label>
                <select className="fi" value={formData.stemField} onChange={(e) => handleInputChange('stemField', e.target.value)}>
                  <option value="Computer Science / AI">Computer Science / AI / ML</option>
                  <option value="Data Science">Data Science / Analytics</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>

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

              <div className="chip chip-info" style={{ marginTop: '12px' }}>
                <Info size={16} />
                <div style={{ fontSize: '11px' }}>Benchmarks are set by field and nationality. Your data is private.</div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-slide-up">
              <div className="fg">
                <label className="fl">University search</label>
                <input className="fi" type="text" placeholder="e.g. Carnegie Mellon" value={formData.university} onChange={(e) => handleInputChange('university', e.target.value)} />
              </div>

              <div className="om-cost-grid">
                <div className="om-cost-item">
                  <span className="omc-label">Tuition</span>
                  <span className="omc-val">${formData.tuition.toLocaleString()}</span>
                </div>
                <div className="om-cost-item">
                  <span className="omc-label">Living</span>
                  <span className="omc-val">${formData.livingCost.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-slide-up">
              <div className="fg">
                <label className="fl">Loan amount needed</label>
                <div className="slider-val" style={{ fontSize: '28px' }}>${formData.loanAmount.toLocaleString()}</div>
                <input type="range" min="0" max="150000" step="1000" value={formData.loanAmount} onChange={(e) => handleInputChange('loanAmount', parseInt(e.target.value))} />
                <div className="slider-range"><span>$0</span><span>$150K</span></div>
              </div>

              <div className="fg" style={{ marginTop: '24px' }}>
                <label className="fl">Choose lender</label>
                <div className="om-loan-list">
                  <div className={`om-lc ${formData.loanType === 'Federal' ? 'sel' : ''}`} onClick={() => handleInputChange('loanType', 'Federal')}>
                    <span>Federal Grad PLUS</span>
                    <strong>8.08%</strong>
                  </div>
                  <div className={`om-lc ${formData.loanType === 'Prodigy' ? 'sel' : ''}`} onClick={() => handleInputChange('loanType', 'Prodigy')}>
                    <span>Prodigy Finance</span>
                    <strong>11.4%</strong>
                  </div>
                  <div className={`om-lc ${formData.loanType === 'MPOWER' ? 'sel' : ''}`} onClick={() => handleInputChange('loanType', 'MPOWER')}>
                    <span>MPOWER Financing</span>
                    <strong>12.9%</strong>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-slide-up">
              <div className="om-opt-list">
                <div className={`om-opt-card ${formData.visaPathway === 'Standard' ? 'sel' : ''}`} onClick={() => handleInputChange('visaPathway', 'Standard')}>
                  <div className="om-opt-title">Standard OPT → H-1B</div>
                  <div className="om-opt-sub">Lottery-based (3 attempts)</div>
                </div>
                <div className={`om-opt-card ${formData.visaPathway === 'O-1' ? 'sel' : ''}`} onClick={() => handleInputChange('visaPathway', 'O-1')}>
                  <div className="om-opt-title">O-1 (Exceptional Talent)</div>
                  <div className="om-opt-sub">No lottery, wage-based</div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-slide-up">
              <div className="fg">
                <label className="fl">Expected OPT Salary</label>
                <div className="slider-val" style={{ fontSize: '28px' }}>${formData.targetSalary.toLocaleString()}</div>
                <input type="range" min="60000" max="250000" step="5000" value={formData.targetSalary} onChange={(e) => handleInputChange('targetSalary', parseInt(e.target.value))} />
                <div className="slider-range"><span>$60K</span><span>$250K</span></div>
              </div>

              <div className="fg" style={{ marginTop: '24px' }}>
                <label className="fl">Home Salary (₹ INR)</label>
                <div className="fi-prefix">
                  <span className="fi-prefix-sym">₹</span>
                  <input className="fi" type="number" value={formData.currentSalary} onChange={(e) => handleInputChange('currentSalary', parseInt(e.target.value))} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Sticky Footer */}
      <div className="om-footer">
        <button className="om-btn-next" onClick={step === 5 ? handleSubmit : nextStep} disabled={isSubmitting}>
          {step === 5 ? (isSubmitting ? 'GENERATING...' : 'GET MY REPORT') : 'CONTINUE'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default OnboardingMobile;
