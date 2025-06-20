import React, { useEffect, useRef } from 'react';

const AdSenseComponent = ({ 
  adSlot, 
  style = {}, 
  format = 'auto',
  responsive = true,
  className = '',
  layout = '',
  layoutKey = ''
}) => {
  const adRef = useRef(null);

  useEffect(() => {
    try {
      // Check if adsbygoogle is available
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        // Push the ad
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.warn('AdSense initialization error:', error);
    }
  }, []);

  // Default styles for different ad types
  const getDefaultStyle = () => {
    const baseStyle = {
      display: 'block',
      textAlign: 'center',
      margin: '20px 0',
      ...style
    };

    return baseStyle;
  };

  const adProps = {
    className: `adsbygoogle ${className}`,
    style: getDefaultStyle(),
    'data-ad-client': 'ca-pub-9668296972373669',
    'data-ad-slot': adSlot,
    'data-ad-format': format,
    ref: adRef
  };

  // Add responsive attribute if needed
  if (responsive) {
    adProps['data-full-width-responsive'] = 'true';
  }

  // Add layout attributes if provided
  if (layout) {
    adProps['data-ad-layout'] = layout;
  }
  if (layoutKey) {
    adProps['data-ad-layout-key'] = layoutKey;
  }

  return (
    <div className="adsense-wrapper">
      <ins {...adProps}></ins>
    </div>
  );
};

// Predefined ad components for different locations
export const HeaderBannerAd = ({ adSlot }) => (
  <AdSenseComponent
    adSlot={adSlot}
    format="horizontal"
    style={{ minHeight: '90px' }}
    className="header-banner-ad"
  />
);

export const SidebarAd = ({ adSlot }) => (
  <AdSenseComponent
    adSlot={adSlot}
    format="vertical"
    style={{ minHeight: '250px', width: '300px' }}
    className="sidebar-ad"
  />
);

export const FooterBannerAd = ({ adSlot }) => (
  <AdSenseComponent
    adSlot={adSlot}
    format="horizontal"
    style={{ minHeight: '90px' }}
    className="footer-banner-ad"
  />
);

export const InContentAd = ({ adSlot }) => (
  <AdSenseComponent
    adSlot={adSlot}
    format="fluid"
    layout="in-article"
    style={{ minHeight: '200px' }}
    className="in-content-ad"
  />
);

export const ResponsiveAd = ({ adSlot, className = '' }) => (
  <AdSenseComponent
    adSlot={adSlot}
    format="auto"
    style={{ minHeight: '200px' }}
    className={`responsive-ad ${className}`}
  />
);

export default AdSenseComponent;