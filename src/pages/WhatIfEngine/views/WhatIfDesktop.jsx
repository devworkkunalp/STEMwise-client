import React from 'react';
import { 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Zap, 
  ArrowRight,
  Globe,
  ChevronRight,
  Pause,
  Ban
} from 'lucide-react';
import Sidebar from '../../../components/Sidebar/Sidebar';

const WhatIfDesktop = ({ 
  profile, 
  user, 
  baseROI, 
  selectedScenario, 
  modeledResult, 
  history, 
  scenarioCards, 
  selectScenario, 
  saveScenarioResult 
}) => {
  return (
    <div className="shell">
      <Sidebar 
        activeTab="scenarios" 
        profile={profile} 
        userName={profile?.displayName || user?.email?.split('@')[0] || 'Student'} 
      />
      
      <div className="main">
        <div id="pg-whatif" className="page active" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="topbar">
            <div>
              <div className="tb-breadcrumb">WHAT-IF ENGINE</div>
              <div className="tb-title">Scenario Stress Testing</div>
            </div>
            <div className="tb-right">
              <div style={{ fontSize: '11px', color: 'var(--hint)', fontFamily: 'var(--fm)' }}>
                Base ROI Tracked: {Math.round(baseROI?.roiScore || baseROI?.roiPercentage || 68)}
              </div>
            </div>
          </div>

          <div className="pbody">
            
            <div className="section-title" style={{ fontSize: '20px', marginBottom: '20px' }}>
              Select a risk scenario to instantly model the impact on your H-1B timeline and ROI payload.
            </div>

            {/* Scenario Grid */}
            <div className="g-3070" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px', marginBottom: '24px' }}>
               {scenarioCards.map((s) => (
                 <div 
                   key={s.id} 
                   className={`card card-${s.color}`} 
                   style={{ 
                     cursor: 'pointer', 
                     border: selectedScenario?.id === s.id ? `1px solid var(--color-${s.color})` : undefined,
                     opacity: selectedScenario && selectedScenario.id !== s.id ? 0.6 : 1,
                     transition: 'all 0.2s ease'
                   }}
                   onClick={() => selectScenario(s)}
                 >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <s.icon size={20} className={`text-${s.color}`} />
                      </div>
                      <strong style={{ fontSize: '15px' }}>{s.title}</strong>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: '1.5' }}>
                      {s.description}
                    </div>
                 </div>
               ))}
            </div>

            {/* Impact Detail View */}
            {selectedScenario && modeledResult && (
              <div id="scenario-detail-view" className="card" style={{ borderTop: `4px solid var(--color-${selectedScenario.color})`, marginBottom: '40px' }}>
                 
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                     <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                           <selectedScenario.icon size={24} className={`text-${selectedScenario.color}`} />
                           <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>Analysis: {selectedScenario.title}</h2>
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--hint)' }}>Probability of occurrence: <strong>52%</strong> base on current benchmarks.</div>
                     </div>
                     <button className="btn btn-outline" onClick={saveScenarioResult}>Save Event Model</button>
                 </div>

                 <div style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '24px', background: 'var(--n4)', borderRadius: '12px', marginBottom: '24px' }}>
                    <div style={{ flex: 1 }}>
                       <div className="eyebrow" style={{ textTransform: 'uppercase', marginBottom: '8px' }}>Base ROI Score</div>
                       <div style={{ fontSize: '42px', fontWeight: '800', fontFamily: 'var(--fd)', color: 'var(--text-secondary)' }}>
                         {Math.round(modeledResult?.baseRoi || baseROI?.roiScore || 0)}
                       </div>
                    </div>
                    <div style={{ opacity: 0.5 }}><ArrowRight size={32} /></div>
                    <div style={{ flex: 1, paddingLeft: '24px', borderLeft: '1px solid var(--bdr)' }}>
                       <div className="eyebrow" style={{ textTransform: 'uppercase', marginBottom: '8px', color: `var(--${selectedScenario.color})` }}>Scenario Impact</div>
                       <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                         <div style={{ fontSize: '42px', fontWeight: '800', fontFamily: 'var(--fd)', color: (modeledResult?.impactScore || 0) < 0 ? 'var(--coral)' : 'var(--teal)' }}>
                           {Math.round(modeledResult?.adjustedRoi || 0)}
                         </div>
                         <div className={`badge ${(modeledResult?.impactScore || 0) < 0 ? 'b-coral' : 'b-teal'}`} style={{ fontSize: '14px', padding: '4px 8px' }}>
                           {(modeledResult?.impactScore || 0) > 0 ? '+' : ''}{Math.round(modeledResult?.impactScore || 0)} PTS
                         </div>
                       </div>
                    </div>
                 </div>

                 <div className="g-3070" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    <div style={{ background: 'var(--bg-navy-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--bdr)' }}>
                       <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={14} className="text-teal" /> Canada PR</div>
                       <div style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--hint)' }}>ROI: 61 / Payback: 4.1yr</div>
                    </div>
                    <div style={{ background: 'var(--bg-navy-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--bdr)' }}>
                       <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={14} className="text-amber" /> Expat Premium</div>
                       <div style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--hint)' }}>ROI: 52 / Payback: 5.8yr</div>
                    </div>
                    <div style={{ background: 'var(--bg-navy-light)', padding: '16px', borderRadius: '8px', border: '1px solid var(--bdr)' }}>
                       <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}><Globe size={14} className="text-sky" /> Specialist Visa</div>
                       <div style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--hint)' }}>ROI: 68 / Payback: 3.6yr</div>
                    </div>
                 </div>
              </div>
            )}

            {/* Saved History */}
            <div className="section" style={{ marginTop: '20px' }}>
               <div className="section-title" style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Clock size={20} className="text-teal" /> Saved Scenario Logs
               </div>
               <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                  <table className="sw-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                     <thead>
                        <tr style={{ background: 'var(--n4)', textAlign: 'left' }}>
                           <th style={{ padding: '12px 20px', fontSize: '11px', color: 'var(--hint)' }}>SCENARIO TYPE</th>
                           <th style={{ padding: '12px 20px', fontSize: '11px', color: 'var(--hint)' }}>IMPACT</th>
                           <th style={{ padding: '12px 20px', fontSize: '11px', color: 'var(--hint)' }}>ADJ. SCORE</th>
                           <th style={{ padding: '12px 20px', fontSize: '11px', color: 'var(--hint)' }}>DATE</th>
                           <th style={{ padding: '12px 20px', textAlign: 'right' }}></th>
                        </tr>
                     </thead>
                     <tbody>
                        {history.length === 0 ? (
                           <tr>
                              <td colSpan="5" style={{ padding: '40px', textAlign: 'center', color: 'var(--hint)', fontSize: '13px' }}>
                                 No saved scenarios yet.
                              </td>
                           </tr>
                        ) : (
                           history.map((item) => (
                             <tr key={item.id} style={{ borderBottom: '1px solid var(--bdr)' }}>
                                <td style={{ padding: '16px 20px', fontWeight: '600', fontSize: '14px' }}>
                                   {(item.scenarioType || item.ScenarioType)?.replace('_', ' ')}
                                </td>
                                <td style={{ padding: '16px 20px' }}>
                                   <span className={`badge ${(item.impactScore || 0) < 0 ? 'b-coral' : 'b-teal'}`} style={{ fontSize: '11px' }}>
                                      {(item.impactScore || 0) > 0 ? '+' : ''}{Math.round(item.impactScore || 0)} PTS
                                   </span>
                                </td>
                                <td style={{ padding: '16px 20px', fontFamily: 'var(--fd)', fontWeight: '700' }}>
                                   {Math.round(item.adjustedRoi || item.AdjustedRoi || 0)}
                                </td>
                                <td style={{ padding: '16px 20px', fontSize: '12px', color: 'var(--muted)' }}>
                                   {new Date(item.createdAt || item.CreatedAt).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                   <ChevronRight size={16} className="text-hint" style={{ cursor: 'pointer' }} />
                                </td>
                             </tr>
                           ))
                        )}
                     </tbody>
                  </table>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIfDesktop;
