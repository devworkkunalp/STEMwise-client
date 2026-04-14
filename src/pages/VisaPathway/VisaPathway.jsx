import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import visaService from '../../services/visaService';
import calculationService from '../../services/calculationService';
import useMobile from '../../hooks/useMobile';

// Components
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Button from '../../components/Button/Button';
import { ShieldAlert } from 'lucide-react';

// Views
import VisaDesktop from './views/VisaDesktop';
import VisaMobile from './views/VisaMobile';

import './VisaPathway.css';

const VisaPathway = () => {
  const isMobile = useMobile();
  const { user, profile, loading: authLoading, authError, refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [visaData, setVisaData] = useState(null);
  const [employers, setEmployers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!profile) return;
      setIsLoading(true);
      try {
        const response = await calculationService.getVisaProbability({
          salary: profile.targetSalary || 115000,
          city: profile.targetCity || 'San Francisco',
          fieldOfStudy: profile.specialization || 'CS',
          isStem: profile.stemField === 'STEM' || profile.specialization?.toLowerCase().includes('computer')
        });
        setVisaData(response);

        const topEmployers = await visaService.getTopSponsors(profile?.targetCity?.split(',')[0] || 'San Jose');
        setEmployers(topEmployers);

      } catch (err) {
        console.error("Error loading visa data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [profile]);

  const displayWageLevels = visaData?.probabilityMatrix || [
    { level: 'Level I', rate: 15, label: 'Entry Level', description: 'Lowest selection probability.' },
    { level: 'Level II', rate: 48, label: 'Qualified', description: 'Standard selection rate.' },
    { level: 'Level III', rate: 61, label: 'Experienced', description: 'Higher selection odds.' },
    { level: 'Level IV', rate: 78, label: 'Fully Competent', description: 'Highest priority.' },
  ];

  const isStem = profile?.stemField === 'STEM' || profile?.specialization?.toLowerCase().includes('computer');
  const visaTimeline = [
    { id: 1, title: 'F-1 Study Phase', status: 'Completed', duration: `${profile?.programDurationYears || 2} Years`, description: 'Full-time study authorization.' },
    { id: 2, title: 'OPT Phase 1', status: 'Active', duration: '12 Months', description: 'Initial work authorization.' },
    isStem && { id: 3, title: 'STEM Extension', status: 'In Scope', duration: '24 Months', description: 'Additional 2 years of work authorization.' },
    { id: 4, title: 'H-1B Lottery 1', status: 'Risk', duration: 'April 2026', description: 'First sponsorship attempt.', risk: 'Wage-based' },
    isStem && { id: 5, title: 'H-1B Lottery 2', status: 'Pending', duration: 'April 2027', description: 'Second attempt.' },
    isStem && { id: 6, title: 'H-1B Lottery 3', status: 'Pending', duration: 'April 2028', description: 'Final attempt.' },
  ].filter(Boolean);

  if (authError && !profile) {
    return (
      <div className="flex-center h-screen flex-column p-4 text-center sw-app-root">
        <ShieldAlert size={48} className="text-coral mb-4" />
        <h2 className="title-gradient">Connection Issue</h2>
        <p className="text-secondary mb-6 max-width-400">
          We couldn't retrieve your profile data. The server might be busy.
        </p>
        <Button variant="primary" onClick={() => refreshProfile(user?.id, true)}>
          Retry Loading Profile
        </Button>
      </div>
    );
  }

  if ((authLoading || isLoading) && !profile) return <LoadingSpinner fullPage message="Securely retrieving your visa pathway..." />;

  const commonProps = {
    profile,
    user,
    visaData,
    employers,
    displayWageLevels,
    visaTimeline,
    isStem,
    refreshProfile
  };

  if (isMobile) {
    return <VisaMobile {...commonProps} />;
  }

  return <VisaDesktop {...commonProps} />;
};

export default VisaPathway;
