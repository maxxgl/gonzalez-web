import React from 'react';
import kurt from './kurt'

export const Context = React.createContext();

export default class ContextProvider extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    speed: null,
    kurt: {},
    counter: 0,
    paused: false,
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

  togglePause = () => this.setState({ paused: !this.state.paused })

  togglePrintData = id => {
    const data = Object.assign({}, this.state.kurt)
    data[id].show = !data[id].show
    this.setState({ kurt: data })
  }

  handleDeviceMotion = event => {
    if (this.state.paused) {
      return
    }
    const data = Object.assign({}, this.state.kurt)
    const { accelerationIncludingGravity, rotationRate, timeStamp } = event
    const accel = accelerationIncludingGravity
    const [out, counter] = kurt(accel, rotationRate, timeStamp, data, this.state.counter)

    for (let k of Object.keys(out)) {
      const newEntry = { x: timeStamp, y: out[k] }
      if (data[k]) {
        if (data[k].data.length > 75) {
          data[k].data.shift()
          data[k].data.push(newEntry)
        } else {
          data[k].data = [...data[k].data, newEntry]
        }
      } else {
        data[k] = { id: k, data: [newEntry], color: 'red', show: false }
      }
    }

    this.setState({ kurt: data, counter: counter })
  }

  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          pause: this.togglePause,
          print: this.togglePrintData,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}
