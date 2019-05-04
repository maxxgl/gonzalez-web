import React from 'react';
import kurt from './kurt'

export const Context = React.createContext();

export default class ContextProvider extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    speed: null,
    kurt: [
      {
        "id": "japan",
        "color": "hsl(344, 70%, 50%)",
        "data": [
          {
            "x": "plane",
            "y": 18
          },
          {
            "x": "helicopter",
            "y": 298
          },
          {
            "x": "boat",
            "y": 161
          },
          {
            "x": "train",
            "y": 35
          },
        ]
      },
    ],
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

  handleDeviceMotion = e => {
    const data = this.state.kurt
    const out = kurt(e.accelerationIncludingGravity, e.timestamp, data)
    this.setState({ kurt: out })
  }

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
