import React from 'react';
import { 
  User, 
  Settings, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  ShieldCheck,
  Building2,
  Globe,
  Bell,
  Lock,
  LogOut,
  ChevronRight
} from 'lucide-react';
import Sidebar from '../../../components/Sidebar/Sidebar';

const ProfileDesktop = ({ 
  profile, 
  user, 
  logout, 
  isUpdating, 
  handleFieldChange, 
  saveProfileChanges 
}) => {
  return (
    <div className="shell">
      <Sidebar 
        activeTab="profile" 
        profile={profile} 
        userName={profile?.displayName || user?.email?.split('@')[0] || 'Student'} 
      />
      
      <div className="main">
        <div id="pg-profile" className="page active" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="topbar" style={{ paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '24px' }}>
            <div>
              <div className="tb-breadcrumb" style={{ color: 'var(--teal)', letterSpacing: '2px', fontSize: '11px', fontWeight: '700' }}>ACCOUNT SETTINGS</div>
              <div className="tb-title" style={{ fontSize: '28px', fontWeight: '800', background: 'linear-gradient(90deg, #fff, #aab2c0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                User Profile & Benchmarks
              </div>
            </div>
            <div className="tb-right">
               <button className="btn btn-primary" onClick={saveProfileChanges} disabled={isUpdating} style={{ borderRadius: '12px', padding: '12px 24px', fontWeight: '600', boxShadow: '0 4px 15px rgba(0, 229, 255, 0.2)' }}>
                 {isUpdating ? 'Saving...' : 'Save All Changes'}
               </button>
            </div>
          </div>

          <div className="pbody">
            
            <div className="section-title" style={{ fontSize: '16px', color: 'var(--hint)', marginBottom: '30px', fontWeight: '400' }}>
              Manage your academic credentials and destination benchmarks to receive highly personalized ROI modeling.
            </div>

            <div className="g-3070">
               {/* Left Menu */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="card" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
                     <div className="m-p-item active" style={{ padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', background: 'rgba(0, 229, 255, 0.1)', color: 'var(--teal)', fontWeight: '600' }}>
                        <User size={18} /> Personal Info
                     </div>
                     <div className="m-p-item" style={{ padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'var(--hint)', transition: 'all 0.2s' }}>
                        <Settings size={18} /> Preferences
                     </div>
                     <div className="m-p-item" style={{ padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'var(--hint)', transition: 'all 0.2s' }}>
                        <ShieldCheck size={18} /> Visa Status
                     </div>
                     <div className="m-p-item" style={{ padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'var(--hint)', transition: 'all 0.2s' }}>
                        <Bell size={18} /> Notifications
                     </div>
                     <div className="m-p-item" style={{ padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'var(--hint)', transition: 'all 0.2s' }}>
                        <Lock size={18} /> Security
                     </div>
                     <div className="divider" style={{ margin: '12px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}></div>
                     <div className="m-p-item text-coral" onClick={logout} style={{ padding: '12px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', color: 'var(--coral)', transition: 'all 0.2s' }}>
                        <LogOut size={18} /> Sign Out
                     </div>
                  </div>
               </div>

               {/* Right Content */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Personal Section */}
                  <div className="card" style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                     <div className="section-title" style={{ marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User size={20} style={{ color: 'var(--teal)' }}/> Core Benchmarks <span style={{ fontSize: '12px', background: 'rgba(0, 229, 255, 0.1)', color: 'var(--teal)', padding: '2px 8px', borderRadius: '12px', marginLeft: 'auto' }}>Affects ROI</span>
                     </div>

                     <div className="g2">
                        <div className="input-group">
                           <span className="input-label" style={{ color: 'var(--hint)', fontSize: '12px', marginBottom: '8px', display: 'block' }}>Display Name</span>
                           <div style={{ position: 'relative' }}>
                             <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--hint)' }} />
                             <input 
                               type="text" 
                               style={{ padding: '12px 14px 12px 40px', width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
                               onFocus={(e) => e.target.style.borderColor = 'var(--teal)'}
                               onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                               value={profile?.displayName || ''} 
                               onChange={(e) => handleFieldChange('displayName', e.target.value)}
                             />
                           </div>
                        </div>
                        <div className="input-group">
                           <span className="input-label" style={{ color: 'var(--hint)', fontSize: '12px', marginBottom: '8px', display: 'block' }}>Nationality</span>
                           <div style={{ position: 'relative' }}>
                             <Globe size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--hint)' }} />
                             <input 
                               type="text" 
                               style={{ padding: '12px 14px 12px 40px', width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
                               onFocus={(e) => e.target.style.borderColor = 'var(--teal)'}
                               onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                               value={profile?.nationality || ''} 
                               onChange={(e) => handleFieldChange('nationality', e.target.value)}
                             />
                           </div>
                        </div>
                     </div>

                     <div className="g2" style={{ marginTop: '20px' }}>
                        <div className="input-group">
                           <span className="input-label" style={{ color: 'var(--hint)', fontSize: '12px', marginBottom: '8px', display: 'block' }}>Target City (US)</span>
                           <div style={{ position: 'relative' }}>
                             <MapPin size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--teal)' }} />
                             <input 
                               type="text" 
                               style={{ padding: '12px 14px 12px 40px', width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
                               onFocus={(e) => e.target.style.borderColor = 'var(--teal)'}
                               onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                               value={profile?.targetCity || ''} 
                               onChange={(e) => handleFieldChange('targetCity', e.target.value)}
                             />
                           </div>
                        </div>
                        <div className="input-group">
                           <span className="input-label" style={{ color: 'var(--hint)', fontSize: '12px', marginBottom: '8px', display: 'block' }}>Target Salary (Annual)</span>
                           <div style={{ position: 'relative' }}>
                             <DollarSign size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--teal)' }} />
                             <input 
                               type="number" 
                               style={{ padding: '12px 14px 12px 40px', width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
                               onFocus={(e) => e.target.style.borderColor = 'var(--teal)'}
                               onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                               value={profile?.targetSalary || 0} 
                               onChange={(e) => handleFieldChange('targetSalary', parseInt(e.target.value))}
                             />
                           </div>
                        </div>
                     </div>

                     <div className="g2" style={{ marginTop: '20px' }}>
                        <div className="input-group">
                           <span className="input-label" style={{ color: 'var(--hint)', fontSize: '12px', marginBottom: '8px', display: 'block' }}>Degree Selection</span>
                           <div style={{ position: 'relative' }}>
                             <Briefcase size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--hint)' }} />
                             <input 
                               type="text" 
                               style={{ padding: '12px 14px 12px 40px', width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
                               onFocus={(e) => e.target.style.borderColor = 'var(--teal)'}
                               onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                               value={profile?.specialization || ''} 
                               onChange={(e) => handleFieldChange('specialization', e.target.value)}
                             />
                           </div>
                        </div>
                        <div className="input-group">
                           <span className="input-label" style={{ color: 'var(--hint)', fontSize: '12px', marginBottom: '8px', display: 'block' }}>STEM Classification</span>
                           <div style={{ position: 'relative' }}>
                             <Building2 size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--hint)' }} />
                             <select 
                               value={profile?.stemField || 'STEM'} 
                               onChange={(e) => handleFieldChange('stemField', e.target.value)}
                               style={{ padding: '12px 14px 12px 40px', width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', outline: 'none', transition: 'border-color 0.3s', appearance: 'none' }}
                               onFocus={(e) => e.target.style.borderColor = 'var(--teal)'}
                               onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                             >
                               <option value="STEM" style={{ background: '#111827' }}>STEM (3-Year OPT)</option>
                               <option value="Non-STEM" style={{ background: '#111827' }}>Non-STEM (1-Year OPT)</option>
                             </select>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Financial Section */}
                  <div className="card" style={{ padding: '24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                     <div className="section-title" style={{ marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '16px', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <DollarSign size={20} style={{ color: 'var(--coral)' }}/> Education Expenses
                     </div>
                     <div className="g2">
                        <div className="input-group">
                           <span className="input-label" style={{ color: 'var(--hint)', fontSize: '12px', marginBottom: '8px', display: 'block' }}>Annual Tuition (USD)</span>
                           <div style={{ position: 'relative' }}>
                             <DollarSign size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--hint)' }} />
                             <input 
                               type="number" 
                               style={{ padding: '12px 14px 12px 40px', width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
                               onFocus={(e) => e.target.style.borderColor = 'var(--coral)'}
                               onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                               value={profile?.annualTuition || 0} 
                               onChange={(e) => handleFieldChange('annualTuition', parseInt(e.target.value))}
                             />
                           </div>
                        </div>
                        <div className="input-group">
                           <span className="input-label" style={{ color: 'var(--hint)', fontSize: '12px', marginBottom: '8px', display: 'block' }}>Living Cost (USD/mo)</span>
                           <div style={{ position: 'relative' }}>
                             <DollarSign size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--hint)' }} />
                             <input 
                               type="number" 
                               style={{ padding: '12px 14px 12px 40px', width: '100%', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', outline: 'none', transition: 'border-color 0.3s' }}
                               onFocus={(e) => e.target.style.borderColor = 'var(--coral)'}
                               onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                               value={(profile?.annualLivingCost / 12) || 0} 
                               onChange={(e) => handleFieldChange('annualLivingCost', parseInt(e.target.value) * 12)}
                             />
                           </div>
                        </div>
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

export default ProfileDesktop;
