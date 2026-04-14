import React from 'react';
import './ProfileMobile.css';
import { 
  User, 
  MapPin, 
  DollarSign, 
  Briefcase, 
  LogOut,
  ShieldCheck,
  CreditCard,
  Save,
  University,
  Calendar
} from 'lucide-react';
import BottomNav from '../../../components/BottomNav/BottomNav';

const ProfileMobile = ({ 
  profile, 
  user, 
  logout,
  isUpdating,
  handleFieldChange,
  saveProfileChanges
}) => {
  return (
    <div className="sw-profile-mobile">
      {/* Header */}
      <div className="m-profile-header">
         <div className="m-avatar-circle">
            <User size={32} />
         </div>
         <div style={{ fontSize: '18px', fontWeight: '800' }}>{profile?.displayName || 'Student'}</div>
         <div style={{ fontSize: '11px', color: 'var(--hint)', marginTop: '4px' }}>{user?.email}</div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
         <div className="m-settings-list">
            
            {/* Account Settings */}
            <div className="m-settings-group">
               <div className="m-settings-group-title">Career Benchmarks</div>
               
               <div className="m-edit-item">
                  <div className="m-edit-label"><MapPin size={14} /> Target City</div>
                  <input 
                    className="m-edit-input" 
                    value={profile?.targetCity || ''} 
                    onChange={(e) => handleFieldChange('targetCity', e.target.value)}
                    placeholder="e.g. San Francisco, US"
                  />
               </div>

               <div className="m-edit-item">
                  <div className="m-edit-label"><DollarSign size={14} /> Target OPT Salary ($)</div>
                  <input 
                    className="m-edit-input" 
                    type="number"
                    value={profile?.targetSalary || ''} 
                    onChange={(e) => handleFieldChange('targetSalary', parseInt(e.target.value) || 0)}
                    placeholder="e.g. 115000"
                  />
               </div>

               <div className="m-edit-item">
                  <div className="m-edit-label"><University size={14} /> University</div>
                  <input 
                    className="m-edit-input" 
                    value={profile?.universityName || ''} 
                    onChange={(e) => handleFieldChange('universityName', e.target.value)}
                    placeholder="e.g. Carnegie Mellon"
                  />
               </div>

               <div className="m-edit-item">
                  <div className="m-edit-label"><Briefcase size={14} /> Specialization</div>
                  <input 
                    className="m-edit-input" 
                    value={profile?.specialization || ''} 
                    onChange={(e) => handleFieldChange('specialization', e.target.value)}
                    placeholder="e.g. Computer Science"
                  />
               </div>

               <div className="m-edit-item">
                  <div className="m-edit-label"><Calendar size={14} /> Intake</div>
                  <input 
                    className="m-edit-input" 
                    value={profile?.intake || ''} 
                    onChange={(e) => handleFieldChange('intake', e.target.value)}
                    placeholder="e.g. Fall 2026"
                  />
               </div>
            </div>

            {/* Financials */}
            <div className="m-settings-group">
               <div className="m-settings-group-title">Financial Benchmarks</div>
               
               <div className="m-edit-item">
                  <div className="m-edit-label"><CreditCard size={14} /> Annual Tuition ($)</div>
                  <input 
                    className="m-edit-input" 
                    type="number"
                    value={profile?.annualTuition || ''} 
                    onChange={(e) => handleFieldChange('annualTuition', parseInt(e.target.value) || 0)}
                  />
               </div>

               <div className="m-edit-item">
                  <div className="m-edit-label"><CreditCard size={14} /> Annual Living Costs ($)</div>
                  <input 
                    className="m-edit-input" 
                    type="number"
                    value={profile?.annualLivingCost || ''} 
                    onChange={(e) => handleFieldChange('annualLivingCost', parseInt(e.target.value) || 0)}
                  />
               </div>
            </div>

            {/* Actions */}
            <div style={{ marginTop: '24px', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
               <button 
                 className="btn btn-primary btn-full" 
                 onClick={saveProfileChanges}
                 disabled={isUpdating}
                 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
               >
                  <Save size={18} /> {isUpdating ? 'Saving...' : 'Save Profile Changes'}
               </button>

               <button 
                 className="btn btn-outline" 
                 style={{ width: '100%', borderColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                 onClick={logout}
               >
                  <LogOut size={16} /> Sign Out
               </button>
            </div>

         </div>
         <div style={{ height: '60px' }}></div>
      </div>
      <BottomNav activeTab="profile" />
    </div>
  );
};

export default ProfileMobile;
