import React, { useState, useEffect } from 'react';
import HomeStyle1 from './HomeStyle1';
import HomeStyle2 from './HomeStyle2';
import HomeStyle3 from './HomeStyle3';
import HomeStyle4 from './HomeStyle4';
import HomeStyleSelector from '../../components/HomeStyleSelector';
import { useToast } from '../../hooks/useToast';

const HomeDashboard = () => {
  const [currentStyle, setCurrentStyle] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const styleFromUrl = urlParams.get('style');
    return styleFromUrl || localStorage.getItem('homeStyle') || 'style1';
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const styleFromUrl = urlParams.get('style');
    if (styleFromUrl && styleFromUrl !== currentStyle) {
      setCurrentStyle(styleFromUrl);
    }
  }, [window.location.search]);

  useEffect(() => {
    localStorage.setItem('homeStyle', currentStyle);
  }, [currentStyle]);

  const renderHomeStyle = () => {
    switch (currentStyle) {
      case 'style2':
        return <HomeStyle2 />;
      case 'style3':
        return <HomeStyle3 />;
      case 'style4':
        return <HomeStyle4 />;
      default:
        return <HomeStyle1 />;
    }
  };

  return (
    <>
      {renderHomeStyle()}
      <HomeStyleSelector 
        currentStyle={currentStyle} 
        onStyleChange={setCurrentStyle} 
      />
      {/* Toast container is mounted globally in AuthProvider now */}
    </>
  );
};

export default HomeDashboard;