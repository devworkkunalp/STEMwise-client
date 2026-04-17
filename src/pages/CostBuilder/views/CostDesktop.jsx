import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';

const CostDesktop = ({ 
  university, 
  course, 
  calculation, 
  livingStyle, 
  setLivingStyle,
  onContinue 
}) => {
  return (
    <div className="shell">
      <Sidebar activeTab="costs" />

      <div className="main">
        <div className="pbody">
          <header className="research-header">
            <div className="rh-eyebrow">Phase 6: Financial Modeling</div>
            <h1 className="rh-title">Total Cost of Attendance (TCO)</h1>
            <p className="rh-desc">
              Beyond tuition. We calculate the aggregate USD exposure across your 
              entire <strong>{calculation.duration} year</strong> journey.
            </p>
          </header>

          <div className="g-7030">
            {/* Left Column: Detailed Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card">
                <div className="section-title">Investment Itemization</div>
                <table className="ctable">
                  <thead>
                    <tr>
                      <th>Expense Category</th>
                      <th>Notes</th>
                      <th style={{ textAlign: 'right' }}>Total USD</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="hl">Tuition & Fees</td>
                      <td style={{ fontSize: '11px', color: 'var(--hint)' }}>{university.name} - {course.name}</td>
                      <td style={{ textAlign: 'right', fontWeight: '600' }}>${calculation.totalTuition.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="hl">Living & Housing</td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {['Off-Campus', 'On-Campus'].map(style => (
                            <button 
                              key={style}
                              className={`btn btn-sm ${livingStyle === style ? 'btn-primary' : 'btn-ghost'}`}
                              style={{ fontSize: '9px', padding: '2px 8px' }}
                              onClick={() => setLivingStyle(style)}
                            >
                              {style}
                            </button>
                          ))}
                        </div>
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: '600' }}>${calculation.totalLiving.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td className="hl">Indirect Costs</td>
                      <td style={{ fontSize: '11px', color: 'var(--hint)' }}>Visa, Insurance, SEVIS, Flights</td>
                      <td style={{ textAlign: 'right', fontWeight: '600' }}>${calculation.miscCosts.toLocaleString()}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2" style={{ fontWeight: '700', padding: '20px 0' }}>Est. Total Investment</td>
                      <td style={{ textAlign: 'right', fontWeight: '800', fontSize: '20px', color: 'var(--teal)', padding: '20px 0' }}>
                        ${calculation.grandTotal.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="alert a-info">
                <strong>Pro Tip: Shared Housing</strong>
                Opting for a 2-bedroom shared apartment (Off-Campus) in <strong>{university.location}</strong> typically saves $6,000/year compared to mandatory on-campus dorms.
              </div>
            </div>

            {/* Right Column: Visual Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="card card-purple">
                <div className="section-title">The Big Number</div>
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                   <div style={{ fontSize: '11px', color: 'var(--hint)', textTransform: 'uppercase' }}>Total exposure</div>
                   <div style={{ fontSize: '36px', fontWeight: '900', color: 'var(--white)', letterSpacing: '-1px' }}>
                      ${(calculation.grandTotal/1000).toFixed(1)}k
                   </div>
                   <div style={{ fontSize: '12px', color: 'var(--teal)', marginTop: '8px' }}>Fully Loaded Portfolio</div>
                </div>
                <div className="divider" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                     <span style={{ color: 'var(--muted)' }}>Est. Monthly Burn</span>
                     <span>$2,100</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                     <span style={{ color: 'var(--muted)' }}>Emergency Fund Req</span>
                     <span>$12,000</span>
                   </div>
                </div>
              </div>

              <button 
                className="btn btn-primary btn-full"
                onClick={onContinue}
              >
                Step 7: Funding Options →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostDesktop;
