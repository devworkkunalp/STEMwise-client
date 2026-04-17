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
  const navigate = useNavigate();
  const isMobile = useMobile();

  // Use dynamic universities from context, falling back to mocks only if completely empty
  const dataList = universities.length > 0 ? universities : UNIVERSITIES;

  const filteredUnis = dataList.filter(uni => {
    // If using real data, we might want to filter by something other than sectorId 
    // for now we assume they are the best schools for the current context
    if (universities.length === 0 && uni.sectorId !== selectedSector?.id) return false;
    
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
      onSelect={handleSelectUni}
      sector={selectedSector}
    />
  );
};

export default UniversityRankings;
