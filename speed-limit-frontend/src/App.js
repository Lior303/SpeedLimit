import React, { useRef } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';

const defaultCenter = [32.05, 34.80];
const defaultZoom = 12;

function App() {
  const mapRef = useRef();

  return (
    <div className="App">
      <Map ref={mapRef} center={defaultCenter} zoom={defaultZoom}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
      </Map>
    </div>
  );
}

export default App;
