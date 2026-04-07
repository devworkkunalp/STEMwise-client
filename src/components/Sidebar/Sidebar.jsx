import React from 'react';
import { 
  LayoutDashboard, 
  Calculator, 
  Globe, 
  Shield, 
  PiggyBank, 
  Zap, 
  Settings,
  LogOut,
  GraduationCap,
  Calendar
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';

import './Sidebar.css';

/**
 * Premium Sidebar for STEMwise dashboard.
 * Vertical navigation for authenticated users with profile card.
 */
const Sidebar = ({ activeTab, onTabChange, userName = 'Student', profile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'calculator', label: 'ROI Calculator', icon: Calculator, path: '/calculator' },
    { id: 'compare', label: 'Country Compare', icon: Globe, path: '/compare' },
    { id: 'visa', label: 'Visa Pathway', icon: Shield, path: '/visa' },
    { id: 'loan', label: 'Loan Simulator', icon: PiggyBank, path: '/dashboard' },
    { id: 'scenarios', label: 'What-If Engine', icon: Zap, path: '/dashboard' },
  ];


  // T11.7: Nationality Flag Helper
  const getFlag = (country) => {
    const flags = {
      'India': '🇮🇳',
      'China': '🇨🇳',
      'USA': '🇺🇸',
      'Canada': '🇨🇦',
      'Germany': '🇩🇪',
    };
    return flags[country] || '🌐';
  };

  const handleLogout = async () => {
     await authService.signOut();
     navigate('/login');
  };

  return (
    <aside className="sw-sidebar glass-panel animate-slide-right">
      {/* T11.7 Profile Card */}
      <div className="sw-sidebar-header">
        <div className="sw-user-card glass-panel" style={{ padding: 'var(--space-4)', width: '100%' }}>
          <div className="flex-center" style={{ gap: 'var(--space-4)', justifyContent: 'flex-start' }}>
            <div className="sw-user-avatar">
              {userName.charAt(0)}
              <span className="sw-user-flag">{getFlag(profile?.nationality)}</span>
            </div>
            <div className="sw-user-info">
              <span className="sw-user-name">{userName}</span>
              <div className="sw-user-subtext">
                 <GraduationCap size={12} />
                 <span>{profile?.degreeLevel === 1 ? 'Masters' : 'PhD'} • {profile?.specialization || 'STEM'}</span>
              </div>
              <div className="sw-user-subtext">
                 <Calendar size={12} />
                 <span>Fall 2024 Intake</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="sw-sidebar-nav">
        <ul className="sw-sidebar-menu">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path && activeTab === item.id;
            return (
              <li key={item.id} className="sw-sidebar-item">
                <button 
                  className={`sw-sidebar-link ${isActive ? 'is-active' : ''}`}
                  onClick={() => {
                    if (onTabChange) onTabChange(item.id);
                    navigate(item.path);
                  }}
                >
                  <item.icon size={18} className="sw-sidebar-icon" />
                  <span className="sw-sidebar-label">{item.label}</span>
                </button>

              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sw-sidebar-footer">
        <button className="sw-sidebar-link">
          <Settings size={18} className="sw-sidebar-icon" />
          <span className="sw-sidebar-label">Settings</span>
        </button>
        <button className="sw-sidebar-link text-coral" onClick={handleLogout}>
          <LogOut size={18} className="sw-sidebar-icon" />
          <span className="sw-sidebar-label">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

