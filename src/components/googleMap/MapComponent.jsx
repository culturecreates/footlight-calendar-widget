import React, { useCallback } from 'react';

const MapComponent = ({ mapUrl, latitude, longitude }) => {
  if (!mapUrl) return null;

  const handleClick = useCallback(() => {
    const googleMapsUrl =
      latitude && longitude ? `https://www.google.com/maps?q=${latitude},${longitude}` : mapUrl;

    window.open(googleMapsUrl, '_blank');
  }, [latitude, longitude, mapUrl]);

  return (
    <img
      src={mapUrl}
      alt="Static map showing selected location"
      style={{ borderRadius: '8px', height: '216px', width: '100%', cursor: 'pointer' }}
      className="google-static-map"
      onClick={handleClick}
    />
  );
};

export default MapComponent;
