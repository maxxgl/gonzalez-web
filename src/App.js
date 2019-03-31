import React, { Component } from 'react';
import './App.css';
import Map from './Map'

export default class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    speed: 0,
    currentSpeed: 0,
    freeFlowSpeed: 0,
    positions: [],
  }

  componentDidMount() {
    let options = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    navigator.geolocation.watchPosition(this.watcher, this.alertError, options);
  }

  watcher = lastPosition => this.setState({ 
    latitude: lastPosition.coords.latitude,
    longitude: lastPosition.coords.longitude,
    speed: lastPosition.coords.speed,
  })
  alertError = err => alert(JSON.stringify(err));

  getRouteData = async () => {
    const { latitude, longitude } = this.state
    let url = new URL("https://api.tomtom.com/traffic/services/4/flowSegmentData/absolute/10/json")
    let params = {
      point: `${latitude},${longitude}`,
      unit: "KMPH",
      key: "tRlSZmuvt4DL39zFXSnxEIYGunG3z89u",
    }
    Object.keys(params)
      .forEach(key => url.searchParams.append(key, params[key]))

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    this.setState({
      currentSpeed: data.flowSegmentData.currentSpeed,
      freeFlowSpeed: data.flowSegmentData.freeFlowSpeed,
      positions: data.flowSegmentData.coordinates.coordinate,
    })
  }

  render() {
    const {
      latitude, longitude, currentSpeed, freeFlowSpeed, speed
    } = this.state

    if (!latitude || !longitude) {
      return <div>Loading...</div>
    }

    return (
      <div className="App">
        <header>
          <h1>Traffic Flow Optimizer</h1>
        </header>
        <main>
          <div className="traffic-data">
            <div>Current Speed: {currentSpeed}</div>
            <div>Freeflow Speed: {freeFlowSpeed}</div>
            <div>Device Speed: {speed || "n/a"}</div>
            <div>Time: {getTime()}</div>
            <button onClick={this.getRouteData}>Get Traffic Data</button>
          </div>
          <Map
            latitude={latitude}
            longitude={longitude}
            positions={this.state.positions}
          />
        </main>
      </div>
    );
  }
}

const getTime = () => {
  const d = new Date();
  return `${d.getHours()}:${d.getMinutes()}.${d.getSeconds()}`
}
