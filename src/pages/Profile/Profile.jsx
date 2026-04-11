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
    <div className="sw-app-root">
      <Navbar isAuthenticated={true} user={user} />
      <div className="sw-profile-page">
        <Sidebar activeTab="settings" onTabChange={(id) => setActiveTab(id)} profile={profile} />
        <main className="sw-profile-container">
          <header className="sw-profile-header">
            <h1 className="text-gradient">Security & Profile</h1>
            <p className="text-secondary">Manage your simulation identity and benchmark locations.</p>
          </header>

          <section className="glass-panel sw-profile-section">
             <div className="section-title">
               <User size={20} className="text-teal" />
               <h3>Identity</h3>
             </div>
             <div className="sw-input-grid">
                <InputField label="Full Name" value={formData.name} disabled />
                <InputField label="Email Address" value={formData.email} disabled />
             </div>
          </section>

          <section className="glass-panel sw-profile-section">
             <div className="section-title">
               <MapPin size={20} className="text-teal" />
               <h3>Simulation Hubs</h3>
             </div>
             <div className="sw-input-grid">
                <InputField 
                   label="Target City (US)" 
                   value={formData.targetCity} 
                   onChange={(e) => setFormData({...formData, targetCity: e.target.value})}
                   placeholder="e.g. Austin, TX"
                />
                <InputField 
                   label="Target Salary (USD)" 
                   type="number"
                   value={formData.targetSalary} 
                   onChange={(e) => setFormData({...formData, targetSalary: parseFloat(e.target.value)})}
                />
                <SelectField 
                   label="Specialization / Major"
                   value={formData.specialization}
                   onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                   options={[
                     { value: 'Computer Science', label: 'Computer Science' },
                     { value: 'Data Science', label: 'Data Science' },
                     { value: 'MBA', label: 'MBA' },
                     { value: 'Architecture', label: 'Architecture' }
                   ]}
                />
             </div>
             <div className="mt-4">
                <Button variant="primary" icon={Save} onClick={handleSave} disabled={isSaving}>
                  {isSaving ? 'Saving Benchmarks...' : 'Save Profile Settings'}
                </Button>
             </div>
          </section>

          <section className="glass-panel sw-profile-section visa-status-card">
             <div className="section-title">
               <ShieldCheck size={20} className="text-teal" />
               <h3>Immigration Status</h3>
             </div>
             <div className="flex-between">
                <span>Current Residency: <strong>F-1 Student</strong></span>
                <Badge variant="teal">Visa Ready</Badge>
             </div>
          </section>
        </main>
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Profile;
