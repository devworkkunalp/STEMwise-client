import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useMobile from '../../hooks/useMobile';

import profileService from '../../services/profileService';
// Components
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

// Views
import ProfileDesktop from './views/ProfileDesktop';
import ProfileMobile from './views/ProfileMobile';

import './Profile.css';

const Profile = () => {
  const isMobile = useMobile();
  const { user, profile, refreshProfile, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);

  // Sync editedProfile with actual profile when editing starts
  const handleFieldChange = (field, value) => {
    setEditedProfile(prev => ({
      ...(prev || profile),
      [field]: value
    }));
  };

  const saveProfileChanges = async () => {
    if (!editedProfile) return;
    setIsUpdating(true);
    try {
      await profileService.upsertProfile(editedProfile);
      // Wait for the backend to settle then refresh local state
      await new Promise(resolve => setTimeout(resolve, 500));
      await refreshProfile(true); 
      setEditedProfile(null); // Clear local edit state so commonProps uses refreshed main profile
      alert('Profile updated successfully!');
    } catch (err) {
      console.error("Update failed", err);
      alert('Failed to update profile.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (loading && !profile) return <LoadingSpinner fullPage message="Accessing your secure profile..." />;

  const commonProps = {
    profile: editedProfile || profile,
    user,
    logout: handleLogout,
    isUpdating,
    handleFieldChange,
    saveProfileChanges
  };

  if (isMobile) {
    return <ProfileMobile {...commonProps} />;
  }

  return <ProfileDesktop {...commonProps} />;
};

export default Profile;
