import React, { useState, useEffect } from 'react';
import { useResearch } from '../../context/ResearchContext';
import { STEM_SECTORS } from '../Research/data/researchMock';
import ExploreDesktop from './views/ExploreDesktop';
import ExploreMobile from './views/ExploreMobile';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';

const ExploreSectors = () => {
  const { setSelectedSector, selectedSector, universities, isLoading } = useResearch();
  const [activeFilter, setActiveFilter] = useState('All Sectors');
  const navigate = useNavigate();
  const isMobile = useMobile();

  // Enrich mock sectors with live data trends if available
  const displaySectors = STEM_SECTORS.map(sector => {
    // If we have live university data, we could potentially compute real medians here
    // For now, we use the curated sectors as the baseline
    return sector;
  });

  const handleSelectSector = (sector) => {
    setSelectedSector(sector);
  };

  const handleDeepDive = (sector) => {
    setSelectedSector(sector);
    navigate('/deep-dive');
  };

  const filteredSectors = displaySectors.filter(sector => {
    if (activeFilter === 'All Sectors') return true;
    if (activeFilter === 'Highest ROI') return sector.roiScore > 80;
    if (activeFilter === 'Best Employment') return sector.employmentRate > 85;
    if (activeFilter === 'Lowest Visa Risk') return sector.h1bSuccess > 50;
    return true;
  });

  // Ensure a default selection if none exists
  useEffect(() => {
    if (!selectedSector && STEM_SECTORS.length > 0) {
      setSelectedSector(STEM_SECTORS[0]);
    }
  }, [selectedSector, setSelectedSector]);

  if (isMobile) {
    return (
      <ExploreMobile 
        sectors={filteredSectors}
        selectedSector={selectedSector}
        onSelect={handleSelectSector}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        onDeepDive={handleDeepDive}
      />
    );
  }

  return (
    <ExploreDesktop 
      sectors={filteredSectors}
      selectedSector={selectedSector}
      onSelect={handleSelectSector}
      activeFilter={activeFilter}
      setActiveFilter={setActiveFilter}
      onDeepDive={handleDeepDive}
    />
  );
};

export default ExploreSectors;
