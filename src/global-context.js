import React from 'react';

export const Context = React.createContext();

export default class ContextProvider extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    speed: null,
    acceleration: {
      x: 0,
      y: 0,
      z: 0,
    },
    interval: 0,
    role: localStorage.getItem('currentRole'),
  }

  componentDidMount() {
    let options = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    navigator.geolocation.watchPosition(this.watcher, this.alertError, options);
    window.addEventListener('devicemotion', this.handleDeviceMotion, true);
  }

  alertError = err => alert(JSON.stringify(err));
  watcher = lastPosition => this.setState({ 
    latitude: lastPosition.coords.latitude,
    longitude: lastPosition.coords.longitude,
    speed: lastPosition.coords.speed,
  })

  handleDeviceMotion = event => this.setState({ ...event })

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}