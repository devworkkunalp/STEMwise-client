import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';
import RealityDesktop from './views/RealityDesktop';
import RealityMobile from './views/RealityMobile';
import { FAILURE_SCENARIOS } from '../Research/data/researchMock';

const RealityCheck = () => {
  const navigate = useNavigate();
  const isMobile = useMobile();

  const handleContinue = () => {
    navigate('/costs');
  };

  const handleGoToWhatIf = () => {
    navigate('/scenarios');
  };

  const viewProps = {
    scenarios: FAILURE_SCENARIOS,
    onContinue: handleContinue,
    onGoToWhatIf: handleGoToWhatIf
  };

  return isMobile ? <RealityMobile {...viewProps} /> : <RealityDesktop {...viewProps} />;
};

export default RealityCheck;
