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
          
          <div className="topbar">
            <div>
              <div className="tb-breadcrumb">ACCOUNT SETTINGS</div>
              <div className="tb-title">User Profile & Benchmarks</div>
            </div>
            <div className="tb-right">
               <button className="btn btn-primary" onClick={saveProfileChanges} disabled={isUpdating}>
                 {isUpdating ? 'Saving...' : 'Save All Changes'}
               </button>
            </div>
          </div>

          <div className="pbody">
            
            <div className="section-title" style={{ fontSize: '20px', marginBottom: '20px' }}>
              Manage your academic credentials and destination benchmarks.
            </div>

            <div className="g-3070">
               {/* Left Menu */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div className="card" style={{ padding: '8px' }}>
                     <div className="m-p-item active">
                        <User size={16} /> Personal Info
                     </div>
                     <div className="m-p-item">
                        <Settings size={16} /> Preferences
                     </div>
                     <div className="m-p-item">
                        <ShieldCheck size={16} /> Visa Status
                     </div>
                     <div className="m-p-item">
                        <Bell size={16} /> Notifications
                     </div>
                     <div className="m-p-item">
                        <Lock size={16} /> Security
                     </div>
                     <div className="divider" style={{ margin: '8px 0' }}></div>
                     <div className="m-p-item text-coral" onClick={logout}>
                        <LogOut size={16} /> Sign Out
                     </div>
                  </div>
               </div>

               {/* Right Content */}
               <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  
                  {/* Personal Section */}
                  <div className="card">
                     <div className="section-title" style={{ marginBottom: '20px', borderBottom: '1px solid var(--bdr)', paddingBottom: '12px' }}>
                        Core Benchmarks (Affects ROI)
                     </div>

                     <div className="g2">
                        <div className="input-group">
                           <span className="input-label">Display Name</span>
                           <input 
                             type="text" 
                             value={profile?.displayName || ''} 
                             onChange={(e) => handleFieldChange('displayName', e.target.value)}
                           />
                        </div>
                        <div className="input-group">
                           <span className="input-label">Nationality</span>
                           <input 
                             type="text" 
                             value={profile?.nationality || ''} 
                             onChange={(e) => handleFieldChange('nationality', e.target.value)}
                           />
                        </div>
                     </div>

                     <div className="g2" style={{ marginTop: '14px' }}>
                        <div className="input-group">
                           <span className="input-label">Target City (US)</span>
                           <div style={{ position: 'relative' }}>
                             <MapPin size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--hint)' }} />
                             <input 
                               type="text" 
                               style={{ paddingLeft: '32px' }} 
                               value={profile?.targetCity || ''} 
                               onChange={(e) => handleFieldChange('targetCity', e.target.value)}
                             />
                           </div>
                        </div>
                        <div className="input-group">
                           <span className="input-label">Target Salary (Annual)</span>
                           <div style={{ position: 'relative' }}>
                             <DollarSign size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--teal)' }} />
                             <input 
                               type="number" 
                               style={{ paddingLeft: '32px' }} 
                               value={profile?.targetSalary || 0} 
                               onChange={(e) => handleFieldChange('targetSalary', parseInt(e.target.value))}
                             />
                           </div>
                        </div>
                     </div>

                     <div className="g2" style={{ marginTop: '14px' }}>
                        <div className="input-group">
                           <span className="input-label">Degree Selection</span>
                           <div style={{ position: 'relative' }}>
                             <Briefcase size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--hint)' }} />
                             <input 
                               type="text" 
                               style={{ paddingLeft: '32px' }} 
                               value={profile?.specialization || ''} 
                               onChange={(e) => handleFieldChange('specialization', e.target.value)}
                             />
                           </div>
                        </div>
                        <div className="input-group">
                           <span className="input-label">STEM Classification</span>
                           <select 
                             value={profile?.stemField || 'STEM'} 
                             onChange={(e) => handleFieldChange('stemField', e.target.value)}
                             style={{ width: '100%', padding: '10px', background: 'var(--n4)', border: '1px solid var(--bdr)', borderRadius: '8px', color: 'var(--white)' }}
                           >
                             <option value="STEM">STEM (3-Year OPT)</option>
                             <option value="Non-STEM">Non-STEM (1-Year OPT)</option>
                           </select>
                        </div>
                     </div>
                  </div>

                  {/* Financial Section */}
                  <div className="card">
                     <div className="section-title" style={{ marginBottom: '20px', borderBottom: '1px solid var(--bdr)', paddingBottom: '12px' }}>
                        Education Expenses
                     </div>
                     <div className="g2">
                        <div className="input-group">
                           <span className="input-label">Annual Tuition (USD)</span>
                           <input 
                             type="number" 
                             value={profile?.annualTuition || 0} 
                             onChange={(e) => handleFieldChange('annualTuition', parseInt(e.target.value))}
                           />
                        </div>
                        <div className="input-group">
                           <span className="input-label">Living Cost (USD/mo)</span>
                           <input 
                             type="number" 
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
  );
};

export default ProfileDesktop;
