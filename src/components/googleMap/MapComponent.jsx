import React, { useCallback, useState } from 'react';
import { ReactComponent as InformationCircle } from '../../assets/informationCircle.svg';

const MapComponent = ({ mapUrl, latitude, longitude }) => {
  const [imageError, setImageError] = useState(false);

  const handleClick = useCallback(() => {
    const googleMapsUrl =
      latitude && longitude ? `https://www.google.com/maps?q=${latitude},${longitude}` : mapUrl;
    window.open(googleMapsUrl, '_blank');
  }, [latitude, longitude, mapUrl]);

  if (!mapUrl) return null;

  return (
    <div
      style={{
        borderRadius: '8px',
        height: '216px',
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
          src={mapUrl}
          alt="Static map showing selected location"
          style={{ borderRadius: '8px', height: '216px', width: '100%' }}
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
