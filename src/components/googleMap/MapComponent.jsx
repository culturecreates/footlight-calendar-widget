import React, { useCallback, useState, useEffect } from 'react';
import { ReactComponent as InformationCircle } from '../../assets/informationCircle.svg';

const MapComponent = ({
  mapUrl,
  latitude,
  longitude,
  country,
  region,
  postalCode,
  locality,
  street,
}) => {
  const [updatedMapUrl, setUpdatedMapUrl] = useState(mapUrl);
  const [imageError, setImageError] = useState(false);

  const getFormattedAddress = () => {
    const parts = [street, locality, region, postalCode, country].filter(Boolean);
    return parts.length ? parts.join(', ') : null;
  };

  const formattedAddress = getFormattedAddress();

  const updateMapSize = (url) => {
    if (!url) return null;

    const isMobile = window.innerWidth < 660;
    const width = isMobile ? 360 : 660;
    const height = isMobile ? 180 : 330;

    return url.replace(/size=\d+x\d+/g, `size=${width}x${height}`);
  };

  useEffect(() => {
    setUpdatedMapUrl(updateMapSize(mapUrl));

    const handleResize = () => setUpdatedMapUrl(updateMapSize(mapUrl));
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [mapUrl]);

  const handleClick = useCallback(() => {
    if (latitude && longitude) {
      let googleMapsUrl;

      if (formattedAddress) {
        googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}&query_place_id=${latitude},${longitude}`;
      } else {
        googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      }

      window.open(googleMapsUrl, '_blank');
    } else {
      window.open(mapUrl, '_blank');
    }
  }, [latitude, longitude, formattedAddress, mapUrl]);

  if (!mapUrl) return null;

  return (
    <div
      style={{
        borderRadius: '8px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      {!imageError ? (
        <img
          src={updatedMapUrl}
          alt="Static map showing selected location"
          style={{ borderRadius: '8px', width: '100%' }}
          className="google-static-map"
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          className="fallback-map-error-component"
        >
          <InformationCircle size={40} color="#888" />
          <p style={{ color: '#666', marginTop: '8px' }}>Map preview unavailable</p>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
