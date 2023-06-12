import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Map, Marker } from " leaflet";

const App = () => {
  const [zoom, setZoom] = useState(15);
  const [lat, setLat] = useState(37.775);
  const [lng, setLng] = useState(-122.418);

  useEffect(() => {
    const map = new Map({
      center: [lat, lng],
      zoom: zoom,
    });

    map.addLayer(new Marker([lat, lng]));

    ReactDOM.render(<div id="map" />, document.getElementById("map"));
  }, [zoom, lat, lng]);

  return (
    <div id="map"></div>
  );
};

export default App;
