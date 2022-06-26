import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API;

const carbonList = [
  {
    id: '2',
    treeId: '0',
    CO2credit: '0.25',
    year: '2021'
  }
]

function ForestMap() {
  const [lng, setLng] = useState(-73.9478);
  const [lat, setLat] = useState(40.7811);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='map-container'>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div id='map'></div>
      <br />
     
    </div>
  )
}

export default ForestMap;