import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Briefcase, 
  TrendingUp, 
  Search,
  Zap,
  Building2,
  ShieldAlert
} from 'lucide-react';
import Sidebar from '../../../components/Sidebar/Sidebar';

const VisaDesktop = ({ 
  profile, 
  user, 
  visaData, 
  employers, 
  displayWageLevels, 
  visaTimeline, 
  isStem, 
  refreshProfile 
}) => {
  return (
    <div className="shell">
      <Sidebar 
        activeTab="visa" 
        profile={profile} 
        userName={profile?.displayName || user?.email?.split('@')[0] || 'Student'} 
      />
      
      <div className="main">
        <div id="pg-visa" className="page active" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="topbar">
            <div>
              <div className="tb-breadcrumb">VISA PATHWAY</div>
              <div className="tb-title">Immigration Roadmap</div>
            </div>
            <div className="tb-right">
              <div style={{ fontSize: '11px', color: 'var(--hint)', fontFamily: 'var(--fm)' }}>
                Targeting: {profile?.targetCity || 'San Francisco'}
              </div>
              <button className="btn btn-outline" onClick={() => alert('Detailed probability breakdown coming soon!')}>
                Detailed Timeline
              </button>
            </div>
          </div>

          <div className="pbody">
            
            <div className="section-title" style={{ fontSize: '20px', marginBottom: '20px' }}>
              <span className="badge b-teal" style={{ marginBottom: '8px' }}>Visa Intelligence</span>
              <div>AI-driven probability model for {profile?.nationality || 'India'} to H-1B transition.</div>
            </div>

            <div className="g-7030">
              {/* Left Panel: Timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="card">
                  <div className="section-title" style={{ marginBottom: '16px' }}>Your Immigration Chain</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    
                    {visaTimeline.map((step, idx) => (
                      <div key={step.id} style={{ display: 'flex', gap: '14px', padding: '14px 0', borderBottom: idx < visaTimeline.length - 1 ? '1px solid var(--bdr)' : 'none' }}>
                        <div style={{ 
                          width: '36px', height: '36px', borderRadius: '50%', 
                          background: step.status === 'Completed' ? 'var(--teal)' : step.status === 'Active' ? 'var(--teal)' : step.status === 'Risk' ? 'rgba(244,168,50,.15)' : 'var(--sky)', 
                          border: step.status === 'Risk' ? '2px dashed var(--amber)' : 'none',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', 
                          color: step.status === 'Risk' ? 'var(--amber)' : 'var(--navy)', flexShrink: 0 
                        }}>
                          {step.id}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: step.status === 'Risk' ? 'var(--amber)' : 'var(--white)' }}>{step.title}</div>
                          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{step.description}</div>
                          {step.risk && <div style={{ fontSize: '10px', color: 'var(--amber)', marginTop: '4px' }}>Risk: {step.risk}</div>}
                          <span className={`badge ${step.status === 'Completed' || step.status === 'Active' ? 'b-teal' : step.status === 'Risk' ? 'b-amber' : 'b-dim'}`} style={{ marginTop: '5px' }}>
                            {step.status}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                  </div>
                </div>
                
                {/* Alternatives */}
                <div className="card card-amber">
                  <div className="section-title" style={{ color: 'var(--amber)', marginBottom: '14px' }}>If H-1B Denied — Your Alternative Paths</div>
                  <div className="g2" style={{ gap: '10px' }}>
                    <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,.05)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--white)', fontWeight: '600' }}>O-1 Visa</div>
                      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Extraordinary ability route</div>
                      <div style={{ fontSize: '10px', color: 'var(--teal)', marginTop: '4px' }}>ROI: 68 · Payback +0.4yr</div>
                    </div>
                    <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,.05)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--white)', fontWeight: '600' }}>EB-2 NIW</div>
                      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>National Interest Waiver</div>
                      <div style={{ fontSize: '10px', color: 'var(--teal)', marginTop: '4px' }}>ROI: 70 · Payback +0.3yr</div>
                    </div>
                    <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,.05)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--white)', fontWeight: '600' }}>Canada PR</div>
                      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Express Entry route</div>
                      <div style={{ fontSize: '10px', color: 'var(--teal)', marginTop: '4px' }}>ROI: 61 · Payback 3.8yr</div>
                    </div>
                    <div style={{ padding: '10px 12px', background: 'rgba(0,0,0,.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,.05)' }}>
                      <div style={{ fontSize: '12px', color: 'var(--white)', fontWeight: '600' }}>Expat Path</div>
                      <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Return Home / Third Country</div>
                      <div style={{ fontSize: '10px', color: 'var(--coral)', marginTop: '4px' }}>ROI: 52 · Payback 5.8yr</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel: Odds & Models */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                <div className="card card-purple">
                  <div className="section-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                     <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={16} /> H-1B Odds</span>
                     <span className="badge b-amber">Wage-Based Model</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', margin: '20px 0' }}>
                    <div style={{ padding: '16px', borderRadius: '12px', background: 'var(--n4)', textAlign: 'center', border: '1px solid var(--bdr)' }}>
                      <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: 'var(--fd)', color: 'var(--teal)', lineHeight: '1' }}>
                        {visaData?.cumulativeSuccessProbability !== undefined ? (visaData.cumulativeSuccessProbability * 100).toFixed(1) : '--'}%
                      </div>
                      <div className="eyebrow" style={{ marginTop: '6px' }}>Selection probability</div>
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      Currently classified as <strong style={{ color: 'var(--white)' }}>Level {visaData?.wageLevel || 'II'}</strong> in <strong style={{ color: 'var(--white)' }}>{profile?.targetCity || 'San Francisco'}</strong>.
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {displayWageLevels.map((lvl) => {
                      const isUserLevel = lvl.level.includes(visaData?.wageLevel || 'II');
                      return (
                        <div key={lvl.level} style={{ padding: '10px 14px', borderRadius: '8px', background: isUserLevel ? 'rgba(0,201,167,.08)' : 'var(--n4)', border: `1px solid ${isUserLevel ? 'rgba(0,201,167,.3)' : 'transparent'}` }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px' }}>
                            <strong style={{ color: isUserLevel ? 'var(--teal)' : 'var(--white)' }}>{lvl.level} — {lvl.label}</strong>
                            <strong style={{ fontFamily: 'var(--fm)' }}>{lvl.rate}%</strong>
                          </div>
                          <div className="prog-track">
                             <div className="prog-fill" style={{ width: `${lvl.rate}%`, background: isUserLevel ? 'var(--teal)' : 'var(--n5)' }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="card">
                   <div className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                     <Building2 size={16} className="text-teal" /> Top H-1B Sponsors
                   </div>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px' }}>
                     {employers.slice(0, 5).map((emp) => (
                       <div key={emp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--bdr)' }}>
                          <div>
                             <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--white)' }}>{emp.name}</div>
                             <div style={{ fontSize: '10px', color: 'var(--hint)' }}>Score: {emp.sponsorScore}/100</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                             <div style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--teal)' }}>{(emp.h1bFilingsTotal || 0).toLocaleString()} <span>Filings</span></div>
                          </div>
                       </div>
                     ))}
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

export default VisaDesktop;
