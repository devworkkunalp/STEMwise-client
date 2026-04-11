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
    { id: 'loan', label: 'Loan Simulator', icon: PiggyBank, path: '/loan' },
    { id: 'scenarios', label: 'What-If Engine', icon: Zap, path: '/scenarios' },
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
      {/* T11.7 Logo Area (New) */}
      <div className="sw-sidebar-brand">
         <span className="text-gradient" style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '1px' }}>STEMwise</span>
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
        {/* T19.2 relocated Profile Card */}
        <div 
          className="sw-user-card glass-panel clickable" 
          onClick={() => navigate('/profile')}
          style={{ padding: 'var(--space-3)', width: '100%', marginBottom: 'var(--space-4)', border: '1px solid var(--border-glass)', cursor: 'pointer' }}
        >
          <div className="flex-center" style={{ gap: 'var(--space-3)', justifyContent: 'flex-start' }}>
            <div className="sw-user-avatar" style={{ width: '36px', height: '36px', fontSize: '14px' }}>
              {userName.charAt(0)}
              <span className="sw-user-flag" style={{ fontSize: '12px' }}>{getFlag(profile?.nationality)}</span>
            </div>
            <div className="sw-user-info">
              <span className="sw-user-name" style={{ fontSize: '13px' }}>{userName}</span>
              <span className="sw-user-subtext" style={{ fontSize: '10px' }}>
                 {profile?.degreeLevel === 'PhD' ? 'PhD' : 'Masters'} • {profile?.specialization || 'STEM'}
              </span>
            </div>
          </div>
        </div>

        <button className={`sw-sidebar-link ${location.pathname === '/profile' ? 'is-active' : ''}`} onClick={() => navigate('/profile')}>
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

