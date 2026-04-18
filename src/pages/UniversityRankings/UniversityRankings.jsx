import React, { useState, useEffect } from 'react';
import { useResearch } from '../../context/ResearchContext';
import { UNIVERSITIES } from '../Research/data/researchMock';
import RankingsDesktop from './views/RankingsDesktop';
import RankingsMobile from './views/RankingsMobile';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';

const UniversityRankings = () => {
  const { selectedSector, setSelectedUniversity, selectedUniversity, universities, isLoading } = useResearch();
  const [activeFilter, setActiveFilter] = useState('All Universities');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const isMobile = useMobile();

  // Use dynamic universities from context, falling back to mocks only if completely empty
  const dataList = universities.length > 0 ? universities : UNIVERSITIES;

  const filteredUnis = dataList.filter(uni => {
    // Search filter
    if (searchTerm) {
      const searchTarget = `${uni.name} ${uni.city || ''} ${uni.state || ''} ${uni.location || ''}`.toLowerCase();
      if (!searchTarget.includes(searchTerm.toLowerCase())) return false;
    }

    // Sector match check
    if (universities.length === 0 && uni.sectorId !== selectedSector?.id) return false;
    
    // Quick Filters
    if (activeFilter === 'Top ROI') return (uni.roiScore || uni.score) > 85;
    if (activeFilter === 'Best Value') return (uni.tuition || 30000) < 35000;
    if (activeFilter === 'High Employment') return (uni.employment || 85) > 90;
    
    return true;
  });

  useEffect(() => {
    if (!selectedSector) {
      navigate('/explore');
      return;
    }
    
    // Auto-select the top uni to ensure clicking "Course Explorer" doesn't bounce
    if (!selectedUniversity && filteredUnis.length > 0) {
      setSelectedUniversity(filteredUnis[0]);
    }
  }, [selectedSector, navigate, filteredUnis, setSelectedUniversity, selectedUniversity]);

  const handleSelectUni = (uni) => {
    setSelectedUniversity(uni);
    navigate('/course-explorer');
  };

  if (!selectedSector) return null;

  if (isMobile) {
    return (
      <RankingsMobile 
        unis={filteredUnis} 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSelect={handleSelectUni}
        sector={selectedSector}
      />
    );
  }

  return (
    <RankingsDesktop 
      unis={filteredUnis} 
      activeFilter={activeFilter} 
      setActiveFilter={setActiveFilter}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      onSelect={handleSelectUni}
      sector={selectedSector}
    />
  );
};

export default UniversityRankings;
