import React, { useState } from 'react';
import { User, Mail, MapPin, Briefcase, Save, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import BottomNav from '../../components/BottomNav/BottomNav';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import SelectField from '../../components/SelectField/SelectField';
import profileService from '../../services/profileService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Badge from '../../components/Badge/Badge';
import './Profile.css';

const Profile = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    targetCity: profile?.targetCity || 'San Francisco, CA',
    targetSalary: profile?.targetSalary || 115000,
    specialization: profile?.specialization || 'Computer Science'
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await profileService.upsertProfile({
        displayName: formData.name,
        targetCity: formData.targetCity,
        targetSalary: formData.targetSalary,
        specialization: formData.specialization,
        // Preserve other profile details if they exist
        nationality: profile?.nationality || 'India',
        homeCurrency: profile?.homeCurrency || 'INR',
        stemField: profile?.stemField || 'STEM',
        degreeLevel: profile?.degreeLevel || 'Masters',
        targetUniversity: profile?.targetUniversity,
        degreeName: profile?.degreeName,
        annualTuition: profile?.annualTuition || 0,
        annualLivingCost: profile?.annualLivingCost || 0,
        programDurationYears: profile?.programDurationYears || 2,
        loanAmount: profile?.loanAmount || 0,
        loanInterestRate: profile?.loanInterestRate || 0
      });

      if (user?.id) {
        await refreshProfile(user.id);
      }
      alert("Profile simulation benchmarks updated successfully!");
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to update profile settings.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="shell">
      <Sidebar activeTab="settings" onTabChange={(id) => setActiveTab(id)} profile={profile} userName={profile?.displayName || user?.email?.split('@')[0] || 'Student'} />
      <div className="main">
        <div id="pg-profile" className="page active" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="topbar">
            <div>
              <div className="tb-breadcrumb">ACCOUNT</div>
              <div className="tb-title">Security & Profile</div>
            </div>
            <div className="tb-right">
               <button className="btn btn-primary" onClick={handleSave} disabled={isSaving}>
                 {isSaving ? 'Saving Benchmarks...' : 'Save Profile Settings'}
               </button>
            </div>
          </div>

          <div className="pbody">
            <div className="section-title" style={{ fontSize: '20px', marginBottom: '24px' }}>
              Manage your simulation identity and benchmark locations.
            </div>

            <div style={{ display: 'grid', gap: '24px', maxWidth: '800px' }}>
              
              <div className="card">
                 <div className="section-title" style={{ marginBottom: '16px' }}>
                   <User size={16} className="text-teal" style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} /> Identity
                 </div>
                 <div className="g2">
                    <div className="input-group">
                       <span className="input-label">Full Name</span>
                       <input type="text" value={formData.name} disabled style={{ opacity: 0.7 }} />
                    </div>
                    <div className="input-group">
                       <span className="input-label">Email Address</span>
                       <input type="email" value={formData.email} disabled style={{ opacity: 0.7 }} />
                    </div>
                 </div>
              </div>

              <div className="card">
                 <div className="section-title" style={{ marginBottom: '16px' }}>
                   <MapPin size={16} className="text-teal" style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} /> Simulation Hubs
                 </div>
                 <div className="g2" style={{ marginBottom: '16px' }}>
                    <div className="input-group">
                       <span className="input-label">Target City (US)</span>
                       <input 
                         type="text"
                         value={formData.targetCity} 
                         onChange={(e) => setFormData({...formData, targetCity: e.target.value})}
                         placeholder="e.g. Austin, TX"
                       />
                    </div>
                    <div className="input-group">
                       <span className="input-label">Target Salary (USD)</span>
                       <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--hint)' }}>$</span>
                          <input 
                            type="number"
                            style={{ paddingLeft: '24px' }}
                            value={formData.targetSalary} 
                            onChange={(e) => setFormData({...formData, targetSalary: parseFloat(e.target.value)})}
                          />
                       </div>
                    </div>
                 </div>
                 <div className="input-group">
                    <span className="input-label">Specialization / Major</span>
                    <select 
                       value={formData.specialization} 
                       onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                       style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'var(--n4)', border: '1px solid var(--bdr)', color: 'var(--white)', fontSize: '13px' }}
                    >
                       <option value="Computer Science">Computer Science</option>
                       <option value="Data Science">Data Science</option>
                       <option value="MBA">MBA</option>
                       <option value="Architecture">Architecture</option>
                    </select>
                 </div>
              </div>

              <div className="card">
                 <div className="section-title" style={{ marginBottom: '16px' }}>
                   <ShieldCheck size={16} className="text-teal" style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} /> Immigration Status
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: 'var(--white)', fontSize: '14px' }}>Current Residency: <strong style={{ fontWeight: '600' }}>F-1 Student</strong></span>
                    <span className="badge b-teal">Visa Ready</span>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
