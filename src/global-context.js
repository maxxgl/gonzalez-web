import React from 'react';
import kurt from './kurt'

export const Context = React.createContext();

export default class ContextProvider extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    speed: null,
    kurt: {},
    data: [
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
      }
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
    const data = Object.assign({}, this.state.kurt)
    const out = kurt(e.accelerationIncludingGravity, e.timeStamp, data)
    Object.keys(out).map(k => {
      const newEntry = { x: e.timeStamp, y: out[k] }
      if (data[k]) {
        if (data[k].data.length > 50) {
          data[k].data.shift()
          data[k].data.push(newEntry)
        } else {
          data[k].data = [...data[k].data, newEntry]
        }
      } else {
        data[k] = { id: k, data: [newEntry], color: 'red' }
      }
    })
    this.setState({ kurt: data })
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
