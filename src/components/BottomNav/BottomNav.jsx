import React from 'react';
import { 
  LayoutDashboard, 
  Calculator, 
  Globe, 
  Shield, 
  Zap 
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BottomNav.css';

/**
 * Mobile Bottom Navigation for STEMwise.
 * Visible only on mobile screens (T11.10).
 */
const BottomNav = ({ activeTab, onTabChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'calculator', label: 'ROI', icon: Calculator, path: '/calculator' },
    { id: 'compare', label: 'Compare', icon: Globe, path: '/dashboard' },
    { id: 'visa', label: 'Visa', icon: Shield, path: '/dashboard' },
    { id: 'scenarios', label: 'What-If', icon: Zap, path: '/dashboard' },
  ];

  return (
    <nav className="sw-bottom-nav glass-panel">
      {navItems.map((item) => (
        <button 
          key={item.id}
          className={`sw-bottom-nav-item ${activeTab === item.id ? 'is-active' : ''}`}
          onClick={() => {
            if (onTabChange) onTabChange(item.id);
            navigate(item.path);
          }}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </button>

      ))}
    </nav>
  );
};

export default BottomNav;
