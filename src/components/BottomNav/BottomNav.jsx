import React from 'react';
import { 
  LayoutDashboard, 
  Calculator, 
  Globe, 
  Shield, 
  Zap 
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import './BottomNav.css';

/**
 * Mobile Bottom Navigation for STEMwise.
 * Visible only on mobile screens (T11.10).
 */
const BottomNav = ({ activeTab, onTabChange }) => {
  const location = useLocation();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'calculator', label: 'ROI', icon: Calculator },
    { id: 'compare', label: 'Compare', icon: Globe },
    { id: 'visa', label: 'Visa', icon: Shield },
    { id: 'scenarios', label: 'What-If', icon: Zap },
  ];

  return (
    <nav className="sw-bottom-nav glass-panel">
      {navItems.map((item) => (
        <button 
          key={item.id}
          className={`sw-bottom-nav-item ${activeTab === item.id ? 'is-active' : ''}`}
          onClick={() => onTabChange && onTabChange(item.id)}
        >
          <item.icon size={20} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
