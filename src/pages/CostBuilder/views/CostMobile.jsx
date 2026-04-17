import React from 'react';
import BottomNav from '../../../components/BottomNav/BottomNav';

const CostMobile = ({ 
  university, 
  calculation, 
  livingStyle, 
  setLivingStyle,
  onContinue 
}) => {
  return (
    <div className="sw-dashboard-mobile" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 80px' }}>
        
        <header className="research-header">
          <div className="rh-eyebrow">Phase 6: Financials</div>
          <h1 className="rh-title" style={{ fontSize: '20px' }}>Investment Builder</h1>
          <p className="rh-desc" style={{ fontSize: '11px' }}>
            Total USD exposure for {calculation.duration} years.
          </p>
        </header>

        {/* Big Number Card */}
        <div className="card card-purple" style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>Grand Total Investment</div>
          <div style={{ fontSize: '32px', fontWeight: '900', color: 'white', margin: '4px 0' }}>
            ${calculation.grandTotal.toLocaleString()}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--teal)' }}>USD · Fully Loaded</div>
        </div>

        {/* Breakdown List */}
        <div className="card" style={{ marginBottom: '16px' }}>
          <div className="section-title" style={{ fontSize: '13px' }}>Itemized Breakdown</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600' }}>Tuition & Mandatory Fees</div>
                <div style={{ fontSize: '10px', color: 'var(--hint)' }}>Net of scholarships</div>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700' }}>${calculation.totalTuition.toLocaleString()}</div>
            </div>

            <div className="divider" />

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <div style={{ fontSize: '12px', fontWeight: '600' }}>Housing & Living</div>
                <div style={{ fontSize: '13px', fontWeight: '700' }}>${calculation.totalLiving.toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['Off-Campus', 'On-Campus'].map(style => (
                  <button 
                    key={style}
                    className={`btn btn-sm ${livingStyle === style ? 'btn-primary' : 'btn-ghost'}`}
                    style={{ fontSize: '8px', padding: '4px 10px', flex: 1 }}
                    onClick={() => setLivingStyle(style)}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            <div className="divider" />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: '600' }}>Indirect Costs</div>
                <div style={{ fontSize: '10px', color: 'var(--hint)' }}>Visa, Insurance, Flights</div>
              </div>
              <div style={{ fontSize: '13px', fontWeight: '700' }}>${calculation.miscCosts.toLocaleString()}</div>
            </div>

          </div>
        </div>

        <button 
          className="btn btn-primary btn-full"
          style={{ marginTop: '24px' }}
          onClick={onContinue}
        >
          Step 7: Funding Options
        </button>

      </div>
      
      <BottomNav activeTab="explore" />
    </div>
  );
};

export default CostMobile;
