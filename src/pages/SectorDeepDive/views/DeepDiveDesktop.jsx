import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const DeepDiveDesktop = ({ sector, isLoading, rents, laborBenchmarks, visaTrends }) => {
  const navigate = useNavigate();

  return (
    <div className="shell">
      <Sidebar activeTab="deepdive" />

      <div className="main">
        <div className="pbody">
          <header className="research-header">
            <div className="rh-eyebrow">Phase 2: Deep Dive Data</div>
            <h1 className="rh-title">The Truth about <em>{sector.name}</em></h1>
            <p className="rh-desc">
              Beyond the marketing brochures. Real outcome probabilities based on USCIS, 
              DOL filings, and alumni surveys for the 2023-2024 cycle.
            </p>
          </header>

          <div className="g-7030">
            {/* Left Column: Outcomes & Distribution */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Outcome Probability */}
              <div className="card">
                <div className="section-title">Outcome Probability (USA)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {sector.outcomes?.map(o => (
                    <div key={o.label} className="prog-wrap" style={{ margin: 0 }}>
                      <div className="prog-header">
                        <div>
                          <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--white)' }}>{o.label}</span>
                          <div style={{ fontSize: '10px', color: 'var(--hint)', marginTop: '2px' }}>{o.subLabel}</div>
                        </div>
                        <span className="prog-val" style={{ color: o.color, fontSize: '16px' }}>{o.value}%</span>
                      </div>
                      <div className="prog-track" style={{ height: '8px', background: 'var(--n5)' }}>
                        <div 
                          className="prog-fill" 
                          style={{ width: `${o.value}%`, background: o.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Country Comparison Table */}
              <div className="card">
                <div className="section-title">Global Alternatives Comparison</div>
                <table className="ctable">
                  <thead>
                    <tr>
                      <th>Country</th>
                      <th>Median Salary</th>
                      <th>PR Metric</th>
                      <th>Visa Ease</th>
                      <th style={{ textAlign: 'right' }}>ROI Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sector.countryAlternatives?.map(c => (
                      <tr key={c.country}>
                        <td className="hl">
                          <span style={{ marginRight: '8px' }}>{c.flag}</span>
                          {c.country}
                        </td>
                        <td>${c.salary?.toLocaleString()}</td>
                        <td>{c.prMetric}</td>
                        <td style={{ color: c.visaEase === 'Difficult' ? 'var(--coral)' : (c.visaEase === 'Smooth' ? 'var(--teal)' : 'inherit') }}>
                          {c.visaEase}
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: '700', color: 'var(--white)' }}>{c.score}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Right Column: Salary Distribution */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card card-purple">
                <div className="section-title">Salary Distribution</div>
                <div className="eyebrow" style={{ marginBottom: '20px' }}>Annual Base Salary (USD)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {sector.salaryDistribution?.map(s => (
                    <div key={s.tier} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '60px', fontSize: '11px', color: 'var(--muted)' }}>{s.tier}</div>
                      <div style={{ flex: 1 }}>
                        <div className="prog-track" style={{ height: '14px', borderRadius: '4px', background: 'var(--n5)' }}>
                          <div 
                            className="prog-fill" 
                            style={{ 
                              width: `${s.percentage}%`, 
                              background: s.tier === 'Median' ? 'var(--teal)' : 'var(--hint)',
                              opacity: s.tier.includes('Bottom') ? '0.5' : '1'
                            }}
                          ></div>
                        </div>
                      </div>
                      <div style={{ width: '70px', textAlign: 'right', fontSize: '11px', fontWeight: '600' }}>
                        ${(s.salary/1000).toFixed(0)}k
                      </div>
                    </div>
                  ))}
                </div>
                <div className="divider" />
                <p style={{ fontSize: '11px', color: 'var(--hint)', fontStyle: 'italic', lineHeight: '1.4' }}>
                  *Bottom 25% data is critical for loan safety assessment. Never borrow based purely on Top 10% averages.
                </p>
              </div>

              {/* Housing Benchmarks Card */}
              <div className="card">
                <div className="section-title">Regional Living Costs (Monthly)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {isLoading ? (
                    <div className="h-hint">Syncing Fair Market Rents...</div>
                  ) : (
                    <>
                      {rents?.slice(0, 3).map((r, idx) => (
                        <div key={`${r.region}-${idx}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{r.region} Bureau Stats</span>
                          <span style={{ fontWeight: '700', color: 'var(--coral)' }}>${r.avgRent?.toLocaleString()}</span>
                        </div>
                      ))}
                      <div style={{ fontSize: '10px', color: 'var(--hint)', fontStyle: 'italic', marginTop: '8px' }}>
                        *HUD 2024 Fair Market Rents for Studio/1BR units.
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Market Benchmarks Card */}
              <div className="card card-purple">
                <div className="section-title">Regional Labor Benchmarks</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {isLoading ? (
                    <div className="h-hint">Syncing live benchmarks...</div>
                  ) : (
                    <>
                      {laborBenchmarks?.slice(0, 3).map(lb => (
                        <div key={lb.region} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{lb.region} (Median)</span>
                          <span style={{ fontWeight: '700', color: 'var(--teal)' }}>${lb.medianSalary?.toLocaleString()}</span>
                        </div>
                      ))}
                      {visaTrends?.slice(0, 1).map(vt => (
                        <div key={vt.region} className="alert a-info" style={{ marginTop: '10px', padding: '10px' }}>
                          <div style={{ fontSize: '11px', fontWeight: '700' }}>{vt.region} Visa Success Rate: {vt.successRate}%</div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className="alert a-warn">
                <strong>Live Market Warning</strong>
                {visaTrends?.length > 0 
                  ? `Recent data indicates a ${visaTrends[0].successRate}% selection rate in power hubs like ${visaTrends[0].region}. Ensure your target wage exceeds Level II thresholds.`
                  : "Wage-based selection means roles under $85k (Level I) have near 0% lottery success in 2024."}
              </div>

              <button 
                className="btn btn-primary btn-full"
                onClick={() => navigate('/rankings')}
              >
                Step 2: Choose a University →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepDiveDesktop;
