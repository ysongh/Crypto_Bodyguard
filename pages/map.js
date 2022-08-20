import React, { useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API;

function Map({ cbContract }) {
  const [lng, setLng] = useState(-73.9478);
  const [lat, setLat] = useState(40.7811);
  const [zoom, setZoom] = useState(10);
  // const [bodyGuards, setbodyGuards] = useState([]);

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

    if(cbContract) loadBodyGuard(map);

    return () => map.remove();
  }, [cbContract]); // eslint-disable-line react-hooks/exhaustive-deps

  async function loadBodyGuard(map) {
    const total = await cbContract.bodyGuardCount();
    console.log(total);
    //let temp = [];

    for(let i = 1; i <= total; i++){
      const data = await cbContract.bodyGuardList(i);
      console.log(data);

      if(data.isAvailable){
        const res = await fetch(data.dataCid + "/bodyguardData.json");
        const nftData = await res.json();

        new mapboxgl.Marker()
        .setLngLat([+data.longitude, +data.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(
              `
                <img src="${data.dataCid}/${nftData.imageName}" alt="Profile Photo" />
                <h5>${nftData.name}</h5>
                <p>${nftData.city}</p>
                <a href="${window.location.origin}/chat/${data.from}" target="_blank" title="Chat Bodybody">Chat</a>
              `
            )
        )
        .addTo(map);
        //temp.push(data);
      }
    }

    //setbodyGuards(temp);
  }

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

export default Map;