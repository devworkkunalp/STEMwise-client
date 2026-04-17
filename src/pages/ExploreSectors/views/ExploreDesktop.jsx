import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Badge from '../../../components/Badge/Badge';

const ExploreDesktop = ({ 
  sectors, 
  selectedSector, 
  onSelect, 
  activeFilter, 
  setActiveFilter,
  onDeepDive
}) => {
  const filters = ['All Sectors', 'Highest ROI', 'Best Employment', 'Lowest Visa Risk'];

  return (
    <div className="shell">
      <Sidebar activeTab="explore" />

      <div className="main">
        <div className="pbody">
          <header className="research-header">
            <div className="rh-eyebrow">Academic Research Hub · Phase 1</div>
            <h1 className="rh-title">Find your field. <em>See the truth first.</em></h1>
            <p className="rh-desc">
              Real employment rates, salary distributions including the bottom 25%, 
              H-1B success rates, and loan default rates — before you commit to anything.
            </p>
          </header>

          <div className="alert a-info">
            <span>ℹ️</span>
            <div>
              <strong>Neutral data only.</strong>
              Salaries show median AND bottom 25%. H-1B odds are real field averages. 
              Default rates are per-school. No university pays to be featured here.
            </div>
          </div>

          <div className="tabs">
            {filters.map(f => (
              <div 
                key={f} 
                className={`tab ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </div>
            ))}
          </div>

          <div className="g3">
            {sectors.map(sector => (
              <div 
                key={sector.id} 
                className={`scard ${sector.color} ${selectedSector?.id === sector.id ? 'selected' : ''}`}
                onClick={() => onSelect(sector)}
              >
                <span className="sc-ico">{sector.icon}</span>
                <div className="sc-nm">{sector.name}</div>
                <div className="sc-sb">{sector.subTitle}</div>
                
                <div className="sc-kv">
                  <span className="sc-k">Median OPT salary</span>
                  <span className="sc-v" style={{ color: 'var(--teal)' }}>${sector.medianSalary?.toLocaleString()}</span>
                </div>
                <div className="sc-kv">
                  <span className="sc-k">Bottom 25% earns</span>
                  <span className="sc-v" style={{ color: 'var(--amber)' }}>${sector.bottom25Salary?.toLocaleString()}</span>
                </div>
                <div className="sc-kv">
                  <span className="sc-k">Employment (6mo)</span>
                  <span className="sc-v">{sector.employmentRate}%</span>
                </div>
                <div className="sc-kv">
                  <span className="sc-k">H-1B success Lvl II</span>
                  <span className="sc-v">{sector.h1bSuccess}%</span>
                </div>
                <div className="sc-kv">
                  <span className="sc-k">Loan default rate</span>
                  <span className="sc-v" style={{ color: sector.loanDefault > 5 ? 'var(--coral)' : 'inherit' }}>
                    {sector.loanDefault}%
                  </span>
                </div>

                <div className="roi-m">
                  <div className="rm-r">
                    <span>ROI Score</span>
                    <span className="rm-v">{sector.roiScore}/100</span>
                  </div>
                  <div className="prog-track">
                    <div 
                      className="prog-fill" 
                      style={{ 
                        width: `${sector.roiScore}%`, 
                        background: 'linear-gradient(90deg, var(--teal), var(--sky))' 
                      }}
                    ></div>
                  </div>
                </div>

                <div className="sc-badges">
                  {sector.badges.map(b => (
                    <Badge 
                      key={b} 
                      type={b.includes('Risk') ? 'coral' : (b.includes('Demand') ? 'sky' : 'teal')}
                      variant="dim"
                    >
                      {b}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {selectedSector && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
              <button 
                className="btn btn-primary" 
                style={{ 
                  padding: '14px 40px', 
                  fontSize: '16px', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0, 201, 167, 0.3)'
                }}
                onClick={() => onDeepDive(selectedSector)}
              >
                Deep Dive into {selectedSector.name} →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreDesktop;
