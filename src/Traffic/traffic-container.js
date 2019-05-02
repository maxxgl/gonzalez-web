import React, { Component } from 'react';
import './traffic-style.css';
import Settings from '../Settings'
import Map from '../Map'

export default class Traffic extends Component {
  state = {
    latitude: null,
    longitude: null,
    speed: 0,
    currentSpeed: 0,
    freeFlowSpeed: 0,
    positions: [],
    style: 'absolute',
    zoom: 10,
    thickness: 10,
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
    let url = new URL(`https://api.tomtom.com/traffic/services/4/flowSegmentData/${this.state.style}/${this.state.zoom}/json`)
    let params = {
      point: `${latitude},${longitude}`,
      unit: "KMPH",
      thickness: this.state.thickness,
      key: "tRlSZmuvt4DL39zFXSnxEIYGunG3z89u",
    }
    Object.keys(params)
      .forEach(key => url.searchParams.append(key, params[key]))

    let data = {}
    try {
      const response = await fetch(url)
      data = await response.json()
    } catch(err) {
      alert(err);
      return
    }
    if (!data.flowSegmentData) {
      alert("Request Error", data)
      return
    }

    console.log(data)
    this.setState({
      currentSpeed: data.flowSegmentData.currentSpeed,
      freeFlowSpeed: data.flowSegmentData.freeFlowSpeed,
      positions: data.flowSegmentData.coordinates.coordinate,
    })
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const {
      latitude,
      longitude,
      currentSpeed,
      freeFlowSpeed,
      speed,
      style,
      zoom,
      thickness,
    } = this.state

    if (!latitude || !longitude) {
      return <div>Loading...</div>
    }

    return (
      <React.Fragment>
        <div className="traffic-data">
          <Settings
            style={style}
            zoom={zoom}
            thickness={thickness}
            change={this.handleChange}
          />
          <div className="data-box">
            <div>Current Speed: {currentSpeed}</div>
            <div>Freeflow Speed: {freeFlowSpeed}</div>
            <div>Device Speed: {(speed || 0).toFixed(1)}</div>
            <div>Time: {getTime()}</div>
          </div>
          <button className="btn btn-float" onClick={this.getRouteData}>
            Get Traffic Data
          </button>
        </div>
        <Map
          latitude={latitude}
          longitude={longitude}
          positions={this.state.positions}
        />
      </React.Fragment>
    );
  }
}

const getTime = () => {
  const d = new Date();
  return `${d.getHours()}:${d.getMinutes()}.${d.getSeconds()}`
}
