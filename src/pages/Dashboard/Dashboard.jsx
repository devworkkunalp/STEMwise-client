import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';
import authService from '../../services/authService';

const Dashboard = () => {
  const { user, profile } = useAuth();
  
  const handleLogout = async () => {
    await authService.signOut();
    window.location.href = '/login';
  };

  return (
    <div className="flex-center h-screen flex-column p-4 text-center">
      <h2>Welcome to your Dashboard, {profile?.displayName || user?.email || 'User'}!</h2>
      <p className="text-secondary mt-2 mb-6">This is a clean, plain dashboard.</p>
      <button 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 20px',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: '500'
        }} 
        onClick={handleLogout}
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
};

export default Dashboard;
