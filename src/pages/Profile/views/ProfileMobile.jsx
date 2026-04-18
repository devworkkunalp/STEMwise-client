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
      <div className="m-profile-header" style={{ padding: '40px 20px 32px', background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
         <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '100px', background: 'rgba(0, 229, 255, 0.1)', filter: 'blur(40px)', borderRadius: '50%' }}></div>
         <div className="m-avatar-circle" style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--teal)', boxShadow: '0 8px 32px rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}>
            <User size={36} strokeWidth={1.5} />
         </div>
         <div style={{ fontSize: '24px', fontWeight: '800', background: 'linear-gradient(90deg, #fff, #aab2c0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginTop: '16px' }}>{profile?.displayName || 'Student'}</div>
         <div style={{ fontSize: '12px', color: 'var(--teal)', marginTop: '6px', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
            <ShieldCheck size={12} /> {user?.email}
         </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', background: 'linear-gradient(to bottom, var(--navy), #0a0e17)' }}>
         <div className="m-settings-list" style={{ padding: '24px 0' }}>
            
            {/* Account Settings */}
            <div className="m-settings-group" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', margin: '0 16px 24px', padding: '20px 16px', backdropFilter: 'blur(10px)' }}>
               <div className="m-settings-group-title" style={{ fontSize: '12px', color: 'var(--teal)', padding: '0', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
                  <Briefcase size={14} /> Career Benchmarks
               </div>
               
               <div className="m-edit-item" style={{ background: 'transparent', padding: '0 0 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px' }}>
                  <div className="m-edit-label" style={{ color: 'var(--hint)' }}><MapPin size={14} /> Target City</div>
                  <input 
                    className="m-edit-input" 
                    value={profile?.targetCity || ''} 
                    onChange={(e) => handleFieldChange('targetCity', e.target.value)}
                    placeholder="e.g. San Francisco, US"
                    style={{ fontSize: '16px', fontWeight: '500' }}
                  />
               </div>

               <div className="m-edit-item" style={{ background: 'transparent', padding: '0 0 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px' }}>
                  <div className="m-edit-label" style={{ color: 'var(--hint)' }}><DollarSign size={14} /> Target OPT Salary ($)</div>
                  <input 
                    className="m-edit-input" 
                    type="number"
                    value={profile?.targetSalary || ''} 
                    onChange={(e) => handleFieldChange('targetSalary', parseInt(e.target.value) || 0)}
                    placeholder="e.g. 115000"
                    style={{ fontSize: '16px', fontWeight: '500' }}
                  />
               </div>

               <div className="m-edit-item" style={{ background: 'transparent', padding: '0 0 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px' }}>
                  <div className="m-edit-label" style={{ color: 'var(--hint)' }}><University size={14} /> University</div>
                  <input 
                    className="m-edit-input" 
                    value={profile?.universityName || ''} 
                    onChange={(e) => handleFieldChange('universityName', e.target.value)}
                    placeholder="e.g. Carnegie Mellon"
                    style={{ fontSize: '16px', fontWeight: '500' }}
                  />
               </div>

               <div className="m-edit-item" style={{ background: 'transparent', padding: '0 0 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px' }}>
                  <div className="m-edit-label" style={{ color: 'var(--hint)' }}><Briefcase size={14} /> Specialization</div>
                  <input 
                    className="m-edit-input" 
                    value={profile?.specialization || ''} 
                    onChange={(e) => handleFieldChange('specialization', e.target.value)}
                    placeholder="e.g. Computer Science"
                    style={{ fontSize: '16px', fontWeight: '500' }}
                  />
               </div>

               <div className="m-edit-item" style={{ background: 'transparent', padding: '0', borderBottom: 'none' }}>
                  <div className="m-edit-label" style={{ color: 'var(--hint)' }}><Calendar size={14} /> Intake</div>
                  <input 
                    className="m-edit-input" 
                    value={profile?.intake || ''} 
                    onChange={(e) => handleFieldChange('intake', e.target.value)}
                    placeholder="e.g. Fall 2026"
                    style={{ fontSize: '16px', fontWeight: '500' }}
                  />
               </div>
            </div>

            {/* Financials */}
            <div className="m-settings-group" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', margin: '0 16px 24px', padding: '20px 16px', backdropFilter: 'blur(10px)' }}>
               <div className="m-settings-group-title" style={{ fontSize: '12px', color: 'var(--coral)', padding: '0', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
                  <CreditCard size={14} /> Financial Benchmarks
               </div>
               
               <div className="m-edit-item" style={{ background: 'transparent', padding: '0 0 16px', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px' }}>
                  <div className="m-edit-label" style={{ color: 'var(--hint)' }}><DollarSign size={14} /> Annual Tuition ($)</div>
                  <input 
                    className="m-edit-input" 
                    type="number"
                    value={profile?.annualTuition || ''} 
                    onChange={(e) => handleFieldChange('annualTuition', parseInt(e.target.value) || 0)}
                    placeholder="e.g. 50000"
                    style={{ fontSize: '16px', fontWeight: '500' }}
                  />
               </div>

               <div className="m-edit-item" style={{ background: 'transparent', padding: '0', borderBottom: 'none' }}>
                  <div className="m-edit-label" style={{ color: 'var(--hint)' }}><DollarSign size={14} /> Annual Living Costs ($)</div>
                  <input 
                    className="m-edit-input" 
                    type="number"
                    value={profile?.annualLivingCost || ''} 
                    onChange={(e) => handleFieldChange('annualLivingCost', parseInt(e.target.value) || 0)}
                    placeholder="e.g. 20000"
                    style={{ fontSize: '16px', fontWeight: '500' }}
                  />
               </div>
            </div>

            {/* Actions */}
            <div style={{ marginTop: '32px', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <button 
                 className="btn btn-primary btn-full" 
                 onClick={saveProfileChanges}
                 disabled={isUpdating}
                 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: '700', boxShadow: '0 4px 20px rgba(0, 229, 255, 0.25)' }}
               >
                  <Save size={18} /> {isUpdating ? 'Saving...' : 'Save Profile Changes'}
               </button>

               <button 
                 className="btn btn-outline" 
                 style={{ width: '100%', borderColor: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '16px', borderRadius: '14px', fontSize: '16px', fontWeight: '600', background: 'rgba(239, 68, 68, 0.05)' }}
                 onClick={logout}
               >
                  <LogOut size={16} /> Sign Out
               </button>
            </div>

         </div>
         <div style={{ height: '24px' }}></div>
      </div>
      <BottomNav activeTab="profile" />
    </div>
  );
};

export default ProfileMobile;
