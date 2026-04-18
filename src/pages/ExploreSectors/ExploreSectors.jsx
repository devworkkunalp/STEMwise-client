import React, { useState, useEffect } from 'react';
import { useResearch } from '../../context/ResearchContext';
import { STEM_SECTORS } from '../Research/data/researchMock';
import ExploreDesktop from './views/ExploreDesktop';
import ExploreMobile from './views/ExploreMobile';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';

const ExploreSectors = () => {
  const { setSelectedSector, selectedSector, laborBenchmarks, isLoading } = useResearch();
  const [activeFilter, setActiveFilter] = useState('All Sectors');
  const navigate = useNavigate();
  const isMobile = useMobile();

  // Hydrate sectors with live labor benchmarking data
  const displaySectors = STEM_SECTORS.map(sector => {
    // New logic: Prioritize exact specialization match, fallback to hub-generic match
    const hubMap = {
      cs: { hub: 'Silicon Valley', spec: 'Computer Science / AI' },
      cyber: { hub: 'NYC Metro', spec: 'Cybersecurity' },
      data: { hub: 'Seattle Metro', spec: 'FinTech' }, // Using FinTech as proxy for high-end data roles
      ee: { hub: 'Silicon Valley', spec: 'Computer Science / AI' },
      mech: { hub: 'Detroit', spec: 'General' },
      biomed: { hub: 'Boston Metro', spec: 'Biomedical' }
    };

    const target = hubMap[sector.id] || { hub: 'General', spec: 'General' };
    
    // Find live match based on specialization + hub
    const liveMatch = laborBenchmarks.find(b => 
      (b.specialization === target.spec && b.regionName === target.hub) ||
      (b.specialization === target.spec) ||
      (b.regionName === target.hub && b.specialization === 'General')
    );

    if (liveMatch) {
      return {
        ...sector,
        medianSalary: liveMatch.medianSalary || sector.medianSalary,
        avgSalary: liveMatch.avgSalary || sector.avgSalary,
        // Calculate a live ROI score boost if salaries are trending high
        roiScore: liveMatch.medianSalary > 120000 ? Math.min(99, sector.roiScore + 5) : sector.roiScore
      };
    }
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
    const score = sector.roiScore || 0;
    const emp = sector.employmentRate || 0;
    const visa = sector.h1bSuccess || 0;

    if (activeFilter === 'Highest ROI') return score > 80;
    if (activeFilter === 'Best Employment') return emp > 85;
    if (activeFilter === 'Lowest Visa Risk') return visa > 50;
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
