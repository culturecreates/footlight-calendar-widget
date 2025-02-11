import React, { useState, useEffect, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const MapComponent = ({ latitude, longitude }) => {
  const defaultLatLng = { lat: 54.35291352856401, lng: -110.072423828125 };

  const [markerPosition, setMarkerPosition] = useState({
    lat: latitude ?? defaultLatLng.lat,
    lng: longitude ?? defaultLatLng.lng,
  });
  const [center, setCenter] = useState({
    lat: latitude ?? defaultLatLng.lat,
    lng: longitude ?? defaultLatLng.lng,
  });
  const [zoom, setZoom] = useState(18);

  const handleMarkerClick = useCallback(() => {
    const googleMapsUrl = `https://www.google.com/maps?q=${markerPosition.lat},${markerPosition.lng}`;
    window.open(googleMapsUrl, '_blank');
  }, [markerPosition]);

  useEffect(() => {
    if (latitude !== markerPosition.lat || longitude !== markerPosition.lng) {
      const newCenter = { lat: latitude ?? defaultLatLng.lat, lng: longitude ?? defaultLatLng.lng };
      setMarkerPosition(newCenter);
      setCenter(newCenter);
    }
  }, [latitude, longitude, markerPosition.lat, markerPosition.lng]);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <Map
        defaultZoom={5}
        mapId={process.env.REACT_APP_GOOGLE_MAPS_ID}
        style={{ height: '216px', width: '100%' }}
        zoom={zoom}
        defaultCenter={center}
        center={center}
        onCameraChanged={(ev) => {
          setZoom(ev?.detail?.zoom);
          setCenter(ev?.detail?.center);
        }}
        options={{ fullscreenControl: false }}
      >
        <AdvancedMarker position={markerPosition} draggable={false} onClick={handleMarkerClick}>
          <Pin />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
};

export default MapComponent;
