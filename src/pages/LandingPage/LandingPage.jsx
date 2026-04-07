import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LandingPage.css';

const LandingPage = () => {
  const { isAuthenticated, profile } = useAuth();
  const navigate = useNavigate();

  const handleStartAnalysis = () => {
    if (isAuthenticated) {
      if (profile) navigate('/dashboard');
      else navigate('/onboarding');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className="lp-replica-root">

      {/* ── NAV ── */}
      <nav className="nav-gs">
        <div className="nav-logo-gs" onClick={() => navigate('/')}>STEMwise</div>
        <div className="nav-links-gs desktop-only">
          <a href="#features" className="nav-link-gs">Features</a>
          <a href="#compare" className="nav-link-gs">Compare</a>
          <a href="#pricing" className="nav-link-gs">Pricing</a>
          <span className="nav-link-gs">Blog</span>
        </div>
        <div className="nav-right-gs">
          <button className="btn-signin-gs" onClick={() => navigate('/login')}>Sign In</button>
          <button className="btn-start-gs" onClick={handleStartAnalysis}>Start Free →</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{maxWidth: '1196px', margin: '0 auto'}}>
        <div className="hero-gs">
          <div>
            <div className="hero-eyebrow-gs">The only lender-independent tool</div>
            <h1 className="hero-h1-gs">Know if your<br/>STEM degree<br/><span>actually pays off.</span></h1>
            <p className="hero-sub-gs">Personalized ROI modeling for international students. Accounts for OPT, H-1B odds, your home currency, and the real cost of studying abroad. Zero lender bias.</p>
            <div className="hero-btns-gs">
              <button className="btn-hero-primary-gs" onClick={handleStartAnalysis}>Calculate My ROI →</button>
              <button className="btn-hero-ghost-gs">
                <div className="play-icon-gs"></div> See how it works
              </button>
            </div>
            <div className="hero-trust-gs">
              <div className="trust-item-gs">No credit card needed</div>
              <div className="trust-item-gs">100% lender-neutral</div>
            </div>
          </div>
          <div>
            <div className="hero-card-gs">
              <div className="hc-header-gs">
                <span className="hc-title-gs">ROI Score — Arjun, MS CS @ CMU</span>
                <span className="hc-payback-label-gs">Payback</span>
              </div>
              <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px'}}>
                <div className="hc-score-row-gs">
                  <div className="hc-score-num-gs">75</div>
                  <div className="hc-score-badge-gs">Strong ROI</div>
                </div>
                <div className="hc-payback-gs">3.2 yrs</div>
              </div>
              <div className="hc-metrics-gs">
                <div className="hc-metric-gs" style={{background: '#0D1B2A'}}>
                  <div className="hcm-label-gs" style={{color: 'rgba(255,255,255,0.3)'}}>Total cost</div>
                  <div className="hcm-val-gs" style={{color: '#fff'}}>$87K</div>
                </div>
                <div className="hc-metric-gs" style={{background: '#0F2A1E'}}>
                  <div className="hcm-label-gs" style={{color: '#00C9A7'}}>OPT Salary</div>
                  <div className="hcm-val-gs" style={{color: '#00C9A7'}}>$118K</div>
                </div>
                <div className="hc-metric-gs" style={{background: '#221A0A'}}>
                  <div className="hcm-label-gs" style={{color: '#F4A832'}}>H-1B Odds</div>
                  <div className="hcm-val-gs" style={{color: '#F4A832'}}>48%</div>
                </div>
              </div>
              <div className="hc-note-gs">₹7.2L equivalent · INR scenario included</div>
            </div>

            {/* Mini comparison preview */}
            <div style={{background: '#111F2E', borderRadius: '16px', padding: '18px', border: '1px solid rgba(255,255,255,0.06)', marginTop: '12px'}}>
              <div style={{fontFamily: "'DM Mono', monospace", fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: '12px'}}>Country comparison · MS Computer Science</div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#fff'}}>🇺🇸 <span>United States</span></div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div style={{width: '80px', height: '4px', background: '#1A3349', borderRadius: '2px', overflow: 'hidden'}}><div style={{width: '75%', height: '100%', background: '#00C9A7', borderRadius: '2px'}}></div></div>
                    <span style={{fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#00C9A7', fontWeight: '500'}}>75</span>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.45)'}}>🇩🇪 <span>Germany</span></div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div style={{width: '80px', height: '4px', background: '#1A3349', borderRadius: '2px', overflow: 'hidden'}}><div style={{width: '70%', height: '100%', background: '#4FC3F7', borderRadius: '2px'}}></div></div>
                    <span style={{fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#4FC3F7'}}>70</span>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.45)'}}>🇨🇦 <span>Canada</span></div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <div style={{width: '80px', height: '4px', background: '#1A3349', borderRadius: '2px', overflow: 'hidden'}}><div style={{width: '66%', height: '100%', background: '#4FC3F7', borderRadius: '2px'}}></div></div>
                    <span style={{fontFamily: "'DM Mono', monospace", fontSize: '11px', color: '#4FC3F7'}}>66</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TICKER ── */}
      <div className="ticker-wrap-gs" style={{marginTop: '64px'}}>
        <div className="ticker-inner-gs">
          <div className="ticker-item-gs">DOL LCA Data <span>4.8M+ records</span></div>
          <div className="ticker-item-gs">US College Scorecard <span>4,600+ programs</span></div>
          <div className="ticker-item-gs">H-1B Lottery <span>Wage-based Feb 2026</span></div>
          <div className="ticker-item-gs">Grad PLUS Eliminated <span>July 2026</span></div>
          <div className="ticker-item-gs">STEM OPT <span>24-month extension</span></div>
          <div className="ticker-item-gs">INR / CNY / NGN <span>Live FX rates</span></div>
          <div className="ticker-item-gs">OPT Salary Data <span>DOL median benchmarks</span></div>
          {/* Duplicate for seamless scroll */}
          <div className="ticker-item-gs">DOL LCA Data <span>4.8M+ records</span></div>
          <div className="ticker-item-gs">US College Scorecard <span>4,600+ programs</span></div>
          <div className="ticker-item-gs">H-1B Lottery <span>Wage-based Feb 2026</span></div>
          <div className="ticker-item-gs">Grad PLUS Eliminated <span>July 2026</span></div>
          <div className="ticker-item-gs">STEM OPT <span>24-month extension</span></div>
          <div className="ticker-item-gs">INR / CNY / NGN <span>Live FX rates</span></div>
          <div className="ticker-item-gs">OPT Salary Data <span>DOL median benchmarks</span></div>
        </div>
      </div>

      {/* ── PROOF BAR ── */}
      <div className="proof-bar-gs">
        <span className="proof-label-gs">Trusted by students from</span>
        <div className="proof-flags-gs">
          <span>🇮🇳</span><span>🇨🇳</span><span>🇳🇬</span><span>🇧🇷</span><span>🇻🇳</span><span>🇵🇰</span><span>🇧🇩</span><span>🇰🇷</span><span>🇳🇵</span>
        </div>
        <div className="proof-stat-gs desktop-only">
          <div className="ps-item-gs"><div className="ps-num-gs">54%</div><div className="ps-lbl-gs">of US STEM masters<br/>are intl students</div></div>
          <div className="ps-item-gs"><div className="ps-num-gs">$87K</div><div className="ps-lbl-gs">avg degree cost<br/>for Indian students</div></div>
          <div className="ps-item-gs"><div className="ps-num-gs">17%</div><div className="ps-lbl-gs">enrollment drop<br/>Fall 2025</div></div>
        </div>
      </div>

      {/* ── PROBLEM SECTION ── */}
      <div style={{maxWidth: '1196px', margin: '0 auto'}}>
        <div className="section-gs">
          <div className="s-header-gs">
            <div className="s-eyebrow-gs">The problem</div>
            <div className="s-title-gs">Three shocks hit at once<br/>in <span>2026.</span></div>
            <div className="divider-gs"></div>
            <div className="s-sub-gs">International STEM students are making $100K decisions on guesswork. The information tools available are either biased, outdated, or completely ignore the visa dimension.</div>
          </div>

          <div className="policy-banner-gs">
            <div className="pb-icon-gs">⚡</div>
            <div className="pb-text-gs">
              <strong>2026 Policy Alert — Three simultaneous shocks</strong>
              <p>Grad PLUS loans eliminated · H-1B shifted to wage-based lottery · 17% international enrollment drop. No existing tool models all three together.</p>
            </div>
            <div className="pb-tag-gs">Active · April 2026</div>
          </div>

          <div className="problem-grid-gs">
            <div className="problem-card-gs">
              <div className="pc-icon-gs">🏦</div>
              <div className="pc-title-gs">Grad PLUS Loans Gone</div>
              <div className="pc-body-gs">As of July 1, 2026 federal graduate PLUS loans are eliminated. New cap is $20,500/year. Most STEM programs cost $50K–$65K annually. Nobody told you about the funding gap.</div>
              <div className="pc-stat-gs">$31,500 avg. funding gap per year</div>
            </div>
            <div className="problem-card-gs">
              <div className="pc-icon-gs">🎲</div>
              <div className="pc-title-gs">H-1B is Now Wage-Based</div>
              <div className="pc-body-gs">Since February 2026, H-1B selection prioritizes higher salaries. Entry-level STEM graduates now face ~15% lottery odds at Level I. Three years ago it was random. Nobody modeled this change for you.</div>
              <div className="pc-stat-gs">15% odds at entry-level salary</div>
            </div>
            <div className="problem-card-gs">
              <div className="pc-icon-gs">📊</div>
              <div className="pc-title-gs">Every Tool Has a Conflict</div>
              <div className="pc-body-gs">MPOWER's ROI calculator is built by a lender. Universities show best-case salaries. Georgetown's data is 10 years old. No tool is neutral, current, and personalized — until now.</div>
              <div className="pc-stat-gs">0 neutral tools existed before STEMwise</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div className="section-full-gs">
        <div className="section-full-inner-gs">
          <div className="s-header-gs" style={{textAlign: 'center'}}>
            <div className="s-eyebrow-gs" style={{textAlign: 'center'}}>How it works</div>
            <div className="s-title-gs" style={{textAlign: 'center'}}>Your ROI in <span>5 steps.</span></div>
            <div className="divider-gs" style={{margin: '14px auto 0'}}></div>
          </div>
          <div className="steps-row-gs">
            <div className="step-item-gs">
              <div className="step-circle-gs">1</div>
              <div className="step-title-gs">Your profile</div>
              <div className="step-sub-gs">Nationality, field, degree level, target intake</div>
            </div>
            <div className="step-item-gs">
              <div className="step-circle-gs">2</div>
              <div className="step-title-gs">University</div>
              <div className="step-sub-gs">Search and auto-fill tuition + cost of living</div>
            </div>
            <div className="step-item-gs">
              <div className="step-circle-gs">3</div>
              <div className="step-title-gs">Loan setup</div>
              <div className="step-sub-gs">Amount, lender type, repayment structure</div>
            </div>
            <div className="step-item-gs">
              <div className="step-circle-gs">4</div>
              <div className="step-title-gs">Visa pathway</div>
              <div className="step-sub-gs">OPT, STEM OPT, H-1B odds by wage level</div>
            </div>
            <div className="step-item-gs">
              <div className="step-circle-gs">5</div>
              <div className="step-title-gs">ROI report</div>
              <div className="step-sub-gs">Score, payback, scenarios in your currency</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{maxWidth: '1196px', margin: '0 auto'}}>
        <div className="section-gs" id="features">
          <div className="s-header-gs">
            <div className="s-eyebrow-gs">Features</div>
            <div className="s-title-gs">Everything the lenders<br/>don't want you to <span>know.</span></div>
            <div className="divider-gs"></div>
          </div>
          <div className="features-grid-gs">
            <div className="feat-card-gs featured">
              <div className="feat-icon-gs" style={{background: 'rgba(0,201,167,0.12)'}}>🧮</div>
              <div className="feat-title-gs">Personalized ROI Calculator</div>
              <div className="feat-body-gs">Your actual payback period in your home currency. Total cost includes tuition, cost of living, visa fees, and full loan interest — not just what the brochure says.</div>
              <div className="feat-chips-gs"><span className="chip-gs">DOL salary data</span><span className="chip-gs">Live FX rates</span><span className="chip-gs">INR / CNY / NGN</span></div>
            </div>
            <div className="feat-card-gs">
              <div className="feat-icon-gs" style={{background: 'rgba(79,195,247,0.1)'}}>✈️</div>
              <div className="feat-title-gs">Visa Pathway Modeler</div>
              <div className="feat-body-gs">H-1B odds by wage level under the new 2026 system. Models OPT → STEM OPT → H-1B chain with actual USCIS cap data, not guesses.</div>
              <div className="feat-chips-gs"><span className="chip-gs">Wage Level I–IV</span><span className="chip-gs">Lottery odds</span><span className="chip-gs">O-1 / EB-2 NIW</span></div>
            </div>
            <div className="feat-card-gs">
              <div className="feat-icon-gs" style={{background: 'rgba(244,168,50,0.1)'}}>🌍</div>
              <div className="feat-title-gs">Multi-Country Comparison</div>
              <div className="feat-body-gs">US vs UK vs Germany vs Canada vs Australia side-by-side. Payback period, post-study visa length, PR pathway, and salary — all in your home currency.</div>
              <div className="feat-chips-gs"><span className="chip-gs">5 countries</span><span className="chip-gs">Post-study visa</span><span className="chip-gs">PR pathways</span></div>
            </div>
            <div className="feat-card-gs">
              <div className="feat-icon-gs" style={{background: 'rgba(255,107,107,0.1)'}}>🔮</div>
              <div className="feat-title-gs">What-If Scenario Engine</div>
              <div className="feat-body-gs">H-1B denied after 3 tries? Salary 20% below benchmark? INR depreciates 15%? See exactly how each risk event changes your payback period — before it happens.</div>
              <div className="feat-chips-gs"><span className="chip-gs">H-1B denied</span><span className="chip-gs">FX stress test</span><span className="chip-gs">Salary shock</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── VS COMPETITION ── */}
      <div className="section-full-gs" id="compare">
        <div className="section-full-inner-gs">
          <div className="s-header-gs">
            <div className="s-eyebrow-gs">Competitive landscape</div>
            <div className="s-title-gs">No other tool does <span>all of this.</span></div>
            <div className="divider-gs"></div>
          </div>
          <div className="compare-wrap-gs">
            <table className="compare-table-gs">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th className="stemwise">STEMwise</th>
                  <th>MPOWER Calc</th>
                  <th>Georgetown CEW</th>
                  <th>H1BData.info</th>
                  <th>DegreeCalc</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="row-title-gs">Lender-neutral / no conflict</td><td className="stemwise col-stemwise-gs"><span className="check">✓</span></td><td><span className="cross">✗</span></td><td><span className="check">✓</span></td><td><span className="check">✓</span></td><td><span className="check">✓</span></td></tr>
                <tr><td className="row-title-gs">OPT / STEM OPT modeling</td><td className="stemwise col-stemwise-gs"><span className="check">✓</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td></tr>
                <tr><td className="row-title-gs">H-1B wage-level lottery odds</td><td className="stemwise col-stemwise-gs"><span className="check">✓</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td><td>Partial</td><td><span className="cross">✗</span></td></tr>
                <tr><td className="row-title-gs">Home currency conversion</td><td className="stemwise col-stemwise-gs"><span className="check">✓</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td></tr>
                <tr><td className="row-title-gs">Multi-country ROI comparison</td><td className="stemwise col-stemwise-gs"><span className="check">✓</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td></tr>
                <tr><td className="row-title-gs">Loan gap analysis (post-Jul 2026)</td><td className="stemwise col-stemwise-gs"><span className="check">✓</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td></tr>
                <tr><td className="row-title-gs">What-if scenario engine</td><td className="stemwise col-stemwise-gs"><span className="check">✓</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td><td><span className="cross">✗</span></td></tr>
                <tr><td className="row-title-gs">Data freshness</td><td className="stemwise col-stemwise-gs">Monthly</td><td>Unknown</td><td>10+ yrs old</td><td>Monthly</td><td>Annual</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── WHO IT'S FOR ── */}
      <div style={{maxWidth: '1196px', margin: '0 auto'}}>
        <div className="section-gs">
          <div className="s-header-gs">
            <div className="s-eyebrow-gs">Who it's for</div>
            <div className="s-title-gs">Built for students making<br/><span>$100K decisions.</span></div>
            <div className="divider-gs"></div>
          </div>
          <div className="persona-row-gs">
            <div className="persona-card-gs">
              <span className="p-flag-gs">🇮🇳</span>
              <div className="p-name-gs">Arjun, 23</div>
              <div className="p-role-gs">MS CS · India · Fall 2026</div>
              <div className="p-quote-gs">"My family's taking an INR loan but no tool shows me the real debt in rupees — or what happens if H-1B fails."</div>
              <div className="p-stat-row-gs">
                <div className="p-stat-gs"><div className="ps-v-gs">75</div><div className="ps-k-gs">ROI Score</div></div>
                <div className="p-stat-gs"><div className="ps-v-gs">3.2yr</div><div className="ps-k-gs">Payback</div></div>
                <div className="p-stat-gs"><div className="ps-v-gs">48%</div><div className="ps-k-gs">H-1B Odds</div></div>
              </div>
            </div>
            <div className="persona-card-gs">
              <span className="p-flag-gs">🇨🇳</span>
              <div className="p-name-gs">Wei, 27</div>
              <div className="p-role-gs">Data Science · STEM OPT Active</div>
              <div className="p-quote-gs">"The new H-1B wage system changed everything. I don't know if Austin vs SF affects my visa odds — I need real data."</div>
              <div className="p-stat-row-gs">
                <div className="p-stat-gs"><div className="ps-v-gs">68</div><div className="ps-k-gs">ROI Score</div></div>
                <div className="p-stat-gs"><div className="ps-v-gs">3.6yr</div><div className="ps-k-gs">Payback</div></div>
                <div className="p-stat-gs"><div className="ps-v-gs">61%</div><div className="ps-k-gs">H-1B Odds</div></div>
              </div>
            </div>
            <div className="persona-card-gs">
              <span className="p-flag-gs">🇳🇬</span>
              <div className="p-name-gs">Amara, 25</div>
              <div className="p-role-gs">Electrical Eng · Choosing country</div>
              <div className="p-quote-gs">"Germany is nearly free but every comparison uses different numbers. I need one honest side-by-side in my currency."</div>
              <div className="p-stat-row-gs">
                <div className="p-stat-gs"><div className="ps-v-gs">70</div><div className="ps-k-gs">Germany</div></div>
                <div className="p-stat-gs"><div className="ps-v-gs">1.4yr</div><div className="ps-k-gs">Payback</div></div>
                <div className="p-stat-gs"><div className="ps-v-gs">Low</div><div className="ps-k-gs">Visa Risk</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PRICING ── */}
      <div className="section-full-gs" id="pricing">
        <div className="section-full-inner-gs">
          <div className="s-header-gs" style={{textAlign: 'center'}}>
            <div className="s-eyebrow-gs" style={{textAlign: 'center'}}>Pricing</div>
            <div className="s-title-gs" style={{textAlign: 'center'}}>Free to start. <span>Pay for depth.</span></div>
            <div className="divider-gs" style={{margin: '14px auto 0'}}></div>
          </div>
          <div className="pricing-row-gs" style={{marginTop: '40px'}}>
            <div className="price-card-gs">
              <div className="price-plan-gs">Free</div>
              <div className="price-desc-gs">For students exploring options and getting a first look at their ROI.</div>
              <div className="price-amount-gs"><span className="price-currency-gs">$</span><span className="price-num-gs">0</span><span className="price-period-gs">/ forever</span></div>
              <div className="price-features-gs">
                <div className="pf-item-gs">ROI Calculator (1 university)</div>
                <div className="pf-item-gs">Visa pathway overview</div>
                <div className="pf-item-gs">Basic H-1B odds</div>
                <div className="pf-item-gs">US-only · USD output</div>
                <div className="pf-item-gs dim">Multi-country comparison</div>
                <div className="pf-item-gs dim">What-If scenario engine</div>
                <div className="pf-item-gs dim">Home currency dashboard</div>
                <div className="pf-item-gs dim">Peer benchmarks</div>
              </div>
              <button className="btn-price-gs btn-price-free-gs" onClick={handleStartAnalysis}>Get started free</button>
            </div>
            <div className="price-card-gs featured">
              <div className="price-badge-gs">Most popular</div>
              <div className="price-plan-gs">Pro</div>
              <div className="price-desc-gs">For serious applicants who need the full picture before signing a loan.</div>
              <div className="price-amount-gs"><span className="price-currency-gs">$</span><span className="price-num-gs">9</span><span className="price-period-gs">/ month</span></div>
              <div className="price-features-gs">
                <div className="pf-item-gs">Everything in Free</div>
                <div className="pf-item-gs">5-country comparison</div>
                <div className="pf-item-gs">Home currency dashboard</div>
                <div className="pf-item-gs">Full What-If engine</div>
                <div className="pf-item-gs">H-1B odds by wage level</div>
                <div className="pf-item-gs">Peer benchmarks</div>
                <div className="pf-item-gs">Loan gap analyzer</div>
                <div className="pf-item-gs">PDF export</div>
              </div>
              <button className="btn-price-gs btn-price-pro-gs" onClick={handleStartAnalysis}>Start Pro →</button>
            </div>
            <div className="price-card-gs">
              <div className="price-plan-gs">Institutional</div>
              <div className="price-desc-gs">For universities licensing STEMwise as a student resource and recruitment tool.</div>
              <div className="price-amount-gs"><span className="price-num-gs" style={{fontSize: '32px', letterSpacing: '-1px'}}>Custom</span></div>
              <div className="price-features-gs">
                <div className="pf-item-gs">Everything in Pro</div>
                <div className="pf-item-gs">Admin dashboard</div>
                <div className="pf-item-gs">Student cohort analytics</div>
                <div className="pf-item-gs">SIS integration via API</div>
                <div className="pf-item-gs">Custom branding option</div>
                <div className="pf-item-gs">Dedicated support</div>
                <div className="pf-item-gs">$5K–$25K / yr per institution</div>
              </div>
              <button className="btn-price-gs btn-price-inst-gs">Contact us →</button>
            </div>
          </div>
          <div style={{textAlign: 'center', marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.2)', fontFamily: "'DM Mono', monospace"}}>STEMwise does not accept affiliate fees from lenders. No lender pays for placement in our Loan Simulator.</div>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <div className="cta-section-gs">
        <div className="s-eyebrow-gs" style={{textAlign: 'center', display: 'block', marginBottom: '16px'}}>Start now · Free</div>
        <div className="cta-title-gs">Your degree is a<br/><span>$100K decision.</span></div>
        <div className="cta-sub-gs">Make it with data, not hope. Get your personalized ROI report in under 5 minutes.</div>
        <div className="cta-btns-gs">
          <button className="btn-hero-primary-gs" style={{padding: '16px 36px', fontSize: '15px'}} onClick={handleStartAnalysis}>Calculate My ROI →</button>
          <button className="btn-hero-ghost-gs" style={{padding: '16px 28px', fontSize: '15px'}}>View sample report</button>
        </div>
        <div className="cta-trust-gs">
          <div className="cta-trust-item-gs">No credit card needed</div>
          <div className="cta-trust-item-gs">100% lender-neutral</div>
          <div className="cta-trust-item-gs">Data from DOL · USCIS · College Scorecard</div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer-gs">
        <div className="footer-grid-gs">
          <div>
            <div className="footer-logo-gs">STEMwise</div>
            <div className="footer-tagline-gs">The only lender-independent ROI transparency platform built for international STEM students.</div>
            <div className="neutrality-badge-gs" style={{marginTop: '16px', display: 'inline-block'}}>100% lender-neutral</div>
          </div>
          <div className="desktop-only">
            <div className="footer-col-title-gs">Product</div>
            <span className="footer-link-gs">ROI Calculator</span>
            <span className="footer-link-gs">Country Compare</span>
            <span className="footer-link-gs">Visa Pathways</span>
            <span className="footer-link-gs">Loan Simulator</span>
            <span className="footer-link-gs">What-If Engine</span>
          </div>
          <div className="desktop-only">
            <div className="footer-col-title-gs">Resources</div>
            <span className="footer-link-gs">Blog</span>
            <span className="footer-link-gs">Data Sources</span>
            <span className="footer-link-gs">Methodology</span>
            <span className="footer-link-gs">2026 Policy Guide</span>
            <span className="footer-link-gs">H-1B Guide 2026</span>
          </div>
          <div className="desktop-only">
            <div className="footer-col-title-gs">Company</div>
            <span className="footer-link-gs">About</span>
            <span className="footer-link-gs">Pricing</span>
            <span className="footer-link-gs">For Universities</span>
            <span className="footer-link-gs">Privacy Policy</span>
            <span className="footer-link-gs">Contact</span>
          </div>
        </div>
        <div className="footer-bottom-gs">
          <div className="footer-copy-gs">© 2026 STEMwise. Built for students, not lenders.</div>
          <div style={{display: 'flex', gap: '16px'}}>
            <span style={{fontSize: '11px', color: 'rgba(255,255,255,0.15)'}}>Data: DOL · USCIS · US College Scorecard · Open Exchange Rates</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
