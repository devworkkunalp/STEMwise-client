import React, { useState, useEffect } from 'react';
import { useResearch } from '../../context/ResearchContext';
import DeepDiveDesktop from './views/DeepDiveDesktop';
import DeepDiveMobile from './views/DeepDiveMobile';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';

const SectorDeepDive = () => {
  const { 
    selectedSector, 
    laborBenchmarks, 
    visaTrends, 
    rents, 
    globalAlternatives,
    isLoading 
  } = useResearch();
  const navigate = useNavigate();
  const isMobile = useMobile();

  useEffect(() => {
    // Redirect if no sector is selected
    if (!selectedSector) {
      navigate('/explore');
    }
  }, [selectedSector, navigate]);

  if (!selectedSector) return null;

  if (isMobile) {
    return (
      <DeepDiveMobile 
        sector={selectedSector} 
        laborBenchmarks={laborBenchmarks}
        visaTrends={visaTrends}
        rents={rents}
        globalAlternatives={globalAlternatives}
        isLoading={isLoading}
      />
    );
  }

  return (
    <DeepDiveDesktop 
      sector={selectedSector} 
      laborBenchmarks={laborBenchmarks} 
      visaTrends={visaTrends}
      rents={rents}
      globalAlternatives={globalAlternatives}
      isLoading={isLoading}
    />
  );
};

export default SectorDeepDive;
