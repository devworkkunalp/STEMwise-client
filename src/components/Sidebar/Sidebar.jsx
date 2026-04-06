import React from 'react';
import { 
  LayoutDashboard, 
  Calculator, 
  Globe, 
  Shield, 
  PiggyBank, 
  Zap, 
  Settings,
  LogOut
} from 'lucide-react';

import './Sidebar.css';

/**
 * Premium Sidebar for STEMwise dashboard.
 * Vertical navigation for authenticated users.
 */
const Sidebar = ({ activeTab = 'dashboard', onTabChange, userName = 'Arjun' }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'calculator', label: 'ROI Calculator', icon: Calculator },
    { id: 'compare', label: 'Country Compare', icon: Globe },
    { id: 'visa', label: 'Visa Pathway', icon: Shield },

    { id: 'loan', label: 'Loan Simulator', icon: PiggyBank },
    { id: 'scenarios', label: 'What-If Engine', icon: Zap },
  ];

  return (
    <aside className="sw-sidebar glass-panel">
      <div className="sw-sidebar-header">
        <div className="sw-user-card">
          <div className="sw-user-avatar">
            {userName.charAt(0)}
          </div>
          <div className="sw-user-info">
            <span className="sw-user-name">{userName}</span>
            <span className="sw-user-status">MS CS Student</span>
          </div>
        </div>
      </div>

      <nav className="sw-sidebar-nav">
        <ul className="sw-sidebar-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="sw-sidebar-item">
              <button 
                className={`sw-sidebar-link ${activeTab === item.id ? 'is-active' : ''}`}
                onClick={() => onTabChange && onTabChange(item.id)}
              >
                <item.icon size={20} className="sw-sidebar-icon" />
                <span className="sw-sidebar-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sw-sidebar-footer">
        <button className="sw-sidebar-link">
          <Settings size={20} className="sw-sidebar-icon" />
          <span className="sw-sidebar-label">Settings</span>
        </button>
        <button className="sw-sidebar-link text-coral">
          <LogOut size={20} className="sw-sidebar-icon" />
          <span className="sw-sidebar-label">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
