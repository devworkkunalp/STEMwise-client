import React from 'react';
import BottomNav from '../../../components/BottomNav/BottomNav';
import { useNavigate } from 'react-router-dom';

const DeepDiveMobile = ({ sector, isLoading, rents, laborBenchmarks, visaTrends }) => {
  const navigate = useNavigate();

  return (
    <div className="sw-dashboard-mobile" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 80px' }}>
        
        <header className="research-header">
          <div className="rh-eyebrow">Deep Dive Data</div>
          <h1 className="rh-title" style={{ fontSize: '20px' }}>{sector.name}</h1>
          <p className="rh-desc" style={{ fontSize: '11px' }}>
            Outcome probabilities and global alternatives for target STEM sectors.
          </p>
        </header>

        {/* Outcome Probability List */}
        <div className="card" style={{ marginBottom: '16px' }}>
          <div className="section-title" style={{ fontSize: '13px' }}>Outcome Probability (USA)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
            {sector.outcomes?.map(o => (
              <div key={o.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', fontWeight: '500' }}>{o.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: o.color }}>{o.value}%</span>
                </div>
                <div className="prog-track" style={{ height: '6px' }}>
                  <div className="prog-fill" style={{ width: `${o.value}%`, background: o.color }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Salary Distribution */}
        <div className="card card-purple" style={{ marginBottom: '16px' }}>
          <div className="section-title" style={{ fontSize: '13px' }}>Salary Distribution</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            {sector.salaryDistribution?.map(s => (
              <div key={s.tier} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: '60px', fontSize: '10px', color: 'var(--muted)' }}>{s.tier}</span>
                <div style={{ flex: 1 }}>
                  <div className="prog-track" style={{ height: '6px' }}>
                    <div 
                      className="prog-fill" 
                      style={{ 
                        width: `${s.percentage}%`, 
                        background: s.tier === 'Median' ? 'var(--teal)' : 'var(--hint)'
                      }}
                    ></div>
                  </div>
                </div>
                <span style={{ fontSize: '11px', fontWeight: '600' }}>${(s.salary/1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alternatives Table */}
        <div className="card" style={{ marginBottom: '16px', overflowX: 'auto' }}>
          <div className="section-title" style={{ fontSize: '13px' }}>Global Alternatives</div>
          <table className="ctable" style={{ fontSize: '11px', marginTop: '10px' }}>
            <thead>
              <tr>
                <th>Country</th>
                <th>Salary</th>
                <th style={{ textAlign: 'right' }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {sector.countryAlternatives?.slice(0, 4).map(c => (
                <tr key={c.country}>
                  <td className="hl">
                    <span style={{ marginRight: '6px' }}>{c.flag}</span>
                    {c.country}
                  </td>
                  <td style={{ fontSize: '10px' }}>${(c.salary/1000).toFixed(0)}k</td>
                  <td style={{ textAlign: 'right', fontWeight: '700' }}>{c.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'center', marginTop: '12px' }}>
            <span style={{ fontSize: '11px', color: 'var(--teal)', cursor: 'pointer' }}>View Detailed PR Comparison →</span>
          </div>
        </div>

        <button 
          className="btn btn-primary btn-full"
          onClick={() => navigate('/rankings')}
        >
          Step 2: Choose University
        </button>

      </div>
      
      <BottomNav activeTab="explore" />
    </div>
  );
};

export default DeepDiveMobile;
