import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';
import RealityDesktop from './views/RealityDesktop';
import RealityMobile from './views/RealityMobile';
import { useResearch } from '../../context/ResearchContext';
import { FAILURE_SCENARIOS } from '../Research/data/researchMock';

const RealityCheck = () => {
  const navigate = useNavigate();
  const isMobile = useMobile();
  const { visaTrends, selectedUniversity } = useResearch();

  // Hydrate scenarios with live data
  const scenarios = React.useMemo(() => {
    return FAILURE_SCENARIOS.map(scenario => {
      if (scenario.id === 'h1b-fail') {
        // Attempt to find live visa success rate for the university's region
        const regionalVisa = visaTrends?.find(v => v.regionName.includes(selectedUniversity?.state || ''));
        if (regionalVisa) {
          return {
            ...scenario,
            stat: `Current ${selectedUniversity?.state || 'regional'} selection rate is ~${(regionalVisa.successRate * 100).toFixed(0)}%.`
          };
        }
      }
      return scenario;
    });
  }, [visaTrends, selectedUniversity]);

  const handleContinue = () => {
    navigate('/costs');
  };

  const handleGoToWhatIf = () => {
    navigate('/scenarios');
  };

  const viewProps = {
    scenarios,
    onContinue: handleContinue,
    onGoToWhatIf: handleGoToWhatIf
  };

  return isMobile ? <RealityMobile {...viewProps} /> : <RealityDesktop {...viewProps} />;
};

export default RealityCheck;
