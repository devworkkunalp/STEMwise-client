import React, { useState } from 'react';
import { 
  Menu,
  X,
  LayoutDashboard, 
  Calculator, 
  Globe, 
  Shield, 
  PiggyBank, 
  Zap, 
  Settings,
  LogOut,
  Telescope,
  BarChart2,
  Landmark,
  BookOpen,
  DollarSign,
  Building,
  User
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import './BottomNav.css';

/**
 * Mobile Navigation App-Bar and Toggleable Drawer
 */
const BottomNav = ({ activeTab, onTabChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (path, id) => {
    if (onTabChange) onTabChange(id);
    setIsOpen(false);
    navigate(path);
  };

  const researchItems = [
    { id: 'explore', label: 'Explore Sectors', icon: Telescope, path: '/explore' },
    { id: 'deepdive', label: 'Sector Deep Dive', icon: BarChart2, path: '/deep-dive' },
    { id: 'rankings', label: 'Uni Rankings', icon: Landmark, path: '/rankings' },
    { id: 'course', label: 'Course Explorer', icon: BookOpen, path: '/course-explorer' },
    { id: 'costs', label: 'Total Cost Builder', icon: DollarSign, path: '/costs' },
    { id: 'funding', label: 'Funding Options', icon: Building, path: '/funding' },
  ];

  const platformItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'calculator', label: 'ROI Calculator', icon: Calculator, path: '/calculator' },
    { id: 'compare', label: 'Country Compare', icon: Globe, path: '/compare' },
    { id: 'visa', label: 'Visa Pathway', icon: Shield, path: '/visa' },
    { id: 'loan', label: 'Loan Simulator', icon: PiggyBank, path: '/loan' },
    { id: 'scenarios', label: 'What-If Engine', icon: Zap, path: '/scenarios' },
  ];

  const logout = async () => {
    await authService.signOut();
    navigate('/login');
  };

  return (
    <>
      {/* Bottom App Bar (Replacing the previous nav) */}
      <nav className="mn-appbar">
        <button className="mn-appbar-btn" onClick={() => setIsOpen(true)}>
          <Menu size={20} />
          <span>Menu</span>
        </button>
        
        <div className="mn-appbar-brand">STEMwise</div>
        
        <button className="mn-appbar-btn" onClick={() => navigate('/profile')}>
          <User size={20} />
          <span>Profile</span>
        </button>
      </nav>

      {/* Backdrop */}
      <div 
        className={`mn-backdrop ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sliding Side Drawer (Azure Style) */}
      <aside className={`mn-drawer ${isOpen ? 'active' : ''}`}>
        <div className="mn-drawer-header">
           <div className="mn-drawer-brand">
              <span className="sc-icon">📊</span> STEMwise
           </div>
           <button className="mn-close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
           </button>
        </div>

        <div className="mn-drawer-content">
          
          <div className="mn-section-lbl">Academic Research</div>
          {researchItems.map((item) => (
             <button 
               key={item.id}
               className={`mn-nav-item ${activeTab === item.id || location.pathname === item.path ? 'active' : ''}`}
               onClick={() => handleNav(item.path, item.id)}
             >
               <item.icon size={18} />
               <span>{item.label}</span>
             </button>
          ))}

          <div className="mn-section-lbl" style={{ marginTop: '24px' }}>ROI Platforms</div>
          {platformItems.map((item) => (
             <button 
               key={item.id}
               className={`mn-nav-item ${activeTab === item.id || location.pathname === item.path ? 'active' : ''}`}
               onClick={() => handleNav(item.path, item.id)}
             >
               <item.icon size={18} />
               <span>{item.label}</span>
             </button>
          ))}

          <div className="mn-section-lbl" style={{ marginTop: '24px' }}>Account & Settings</div>
          <button 
             className={`mn-nav-item ${location.pathname === '/profile' ? 'active' : ''}`}
             onClick={() => handleNav('/profile', 'profile')}
          >
             <Settings size={18} />
             <span>User Profile</span>
          </button>
          <button className="mn-nav-item text-coral" onClick={logout} style={{ color: 'var(--coral)' }}>
             <LogOut size={18} />
             <span>Sign Out</span>
          </button>

        </div>
      </aside>
    </>
  );
};

export default BottomNav;

