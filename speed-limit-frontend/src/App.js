import React from 'react';
import { Map, TileLayer, Circle } from 'react-leaflet';
import './App.css';
import 'leaflet/dist/leaflet.css';

const defaultCenter = [32.081316, 34.794409];
const defaultZoom = 12;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
  });
}

const colorDict = {
  1: 'green',
  2: 'yellow',
  3: 'red',
}

const createCirclesComponents = (data) => {
  return data.map((element) => <Circle className={`circle-${colorDict[element[2]]}`} center={[element[0], element[1]]} radius={6} />);
}

class App extends React.Component {

  state = {
    data: []
  }

  componentDidMount() {
    // Simple GET request using fetch
    fetch('https://localhost:8001')
      .then(response => response.json())
      .then(data => this.setState(data));
  }

  data = [
    [32.081316, 34.794409, 3],
    [32.081197, 34.794377, 3],
    [32.081079, 34.794356, 3],
    [32.080988, 34.794345, 3],
    [32.080902, 34.794307, 3],
    [32.080806, 34.794291, 3],
    [32.080693, 34.794275, 3],
    [32.080588, 34.794254, 3],
    [32.08049, 34.79423, 3],
    [32.080363, 34.794198, 3],
    [32.080331, 34.794145, 1],
    [32.080626, 34.794231, 1],
    [32.080526, 34.794215, 1],
    [32.080813, 34.794323, 1],
    [32.080753, 34.794264, 1],
    [32.081026, 34.794339, 1],
    [32.080608, 34.794258, 1],
    [32.080476, 34.794226, 1],
    [32.080408, 34.794183, 1],
    [32.080626, 34.794247, 1],
    [32.080535, 34.794258, 1],
    [32.080426, 34.794183, 1],
    [32.080726, 34.794269, 1],
    [32.080617, 34.79428, 3],
    [32.080894, 34.794312, 3],
  ]

  render() {
    return (
      <div className="App">
        <Map center={defaultCenter} zoom={defaultZoom} minZoom={12}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors" />
          {
            createCirclesComponents(this.data)
          }
        </Map>
      </div>
    );
  }

}


export default App;
