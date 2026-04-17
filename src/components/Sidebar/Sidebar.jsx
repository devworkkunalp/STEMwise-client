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
  Calendar,
  DollarSign
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

  const researchItems = [
    { id: 'explore', label: 'Explore Sectors', path: '/explore' },
    { id: 'deepdive', label: 'Sector Deep Dive', path: '/deep-dive' },
    { id: 'rankings', label: 'Uni Rankings', path: '/rankings' },
    { id: 'course', label: 'Course Explorer', path: '/course-explorer' },
    { id: 'reality', label: 'Reality Check', path: '/reality-check' },
    { id: 'costs', label: 'Total Cost Builder', path: '/costs' },
    { id: 'funding', label: 'Funding Options', path: '/funding' },
  ];

  const platformItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { id: 'calculator', label: 'ROI Calculator', path: '/calculator' },
    { id: 'compare', label: 'Country Compare', path: '/compare' },
    { id: 'visa', label: 'Visa Pathway', path: '/visa' },
    { id: 'loan', label: 'Loan Simulator', path: '/loan' },
    { id: 'scenarios', label: 'What-If Engine', path: '/scenarios' },
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
    <aside className="sb">
      <div className="sb-logo">
        <div className="sb-wm">STEMwise</div>
        <div className="sb-tagline">ROI Intelligence Platform</div>
      </div>
      
      <nav className="sb-nav">
        <div className="sb-section-lbl">Academic Research</div>
        {researchItems.map((item) => {
          const isActive = location.pathname === item.path || activeTab === item.id;
          
          let iconEmoji = '📊';
          if (item.id === 'explore') iconEmoji = '🔭';
          if (item.id === 'deepdive') iconEmoji = '📊';
          if (item.id === 'rankings') iconEmoji = '🏛️';
          if (item.id === 'course') iconEmoji = '📚';
          if (item.id === 'reality') iconEmoji = '🪞';
          if (item.id === 'costs') iconEmoji = '💵';
          if (item.id === 'funding') iconEmoji = '🏦';

          return (
            <div 
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                if (onTabChange) onTabChange(item.id);
                navigate(item.path);
              }}
            >
              <span className="ni">{iconEmoji}</span>{item.label}
            </div>
          );
        })}

        <div className="sb-section-lbl" style={{ marginTop: '14px' }}>ROI Platforms</div>
        {platformItems.map((item) => {
          const isActive = location.pathname === item.path || activeTab === item.id;
          
          let iconEmoji = '📊';
          if (item.id === 'calculator') iconEmoji = '🧮';
          if (item.id === 'compare') iconEmoji = '🌍';
          if (item.id === 'visa') iconEmoji = '✈️';
          if (item.id === 'loan') iconEmoji = '💰';
          if (item.id === 'scenarios') iconEmoji = '🔮';

          return (
            <div 
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                if (onTabChange) onTabChange(item.id);
                navigate(item.path);
              }}
            >
              <span className="ni">{iconEmoji}</span>{item.label}
              {item.id === 'dashboard' && <span className="nav-badge nb-amber">Alert</span>}
            </div>
          );
        })}

        <div className="sb-section-lbl" style={{ marginTop: '8px' }}>Tools</div>
        <div className="nav-item"><span className="ni">🎓</span>Scholarships<span className="nav-badge nb-green">New</span></div>
        <div className="nav-item"><span className="ni">🏢</span>Employers</div>
        
        <div className="sb-section-lbl" style={{ marginTop: '8px' }}>Account</div>
        <div 
          className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`} 
          onClick={() => navigate('/profile')}
        >
          <span className="ni">⚙️</span>Settings
        </div>
        <div className="nav-item" onClick={handleLogout}>
          <span className="ni">🚪</span>Sign Out
        </div>
      </nav>

      <div className="sb-user" onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="sb-avatar">{userName.charAt(0)}</div>
          <div className="sb-user-info">
            <div className="sb-user-name">{userName}</div>
            <div className="sb-user-sub">{getFlag(profile?.nationality)} {profile?.degreeLevel === 1 ? 'MS CS' : 'PhD'} · {profile?.specialization || 'STEM'}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

