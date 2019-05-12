import React from 'react';
import kurt from './kurt'

export const Context = React.createContext();

export default class ContextProvider extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    speed: null,
    motion: {},
    kurt: {},
    counter: [],
    paused: false,
  }

  componentDidMount() {
    let options = { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    navigator.geolocation.watchPosition(this.watcher, this.alertError, options);
    window.addEventListener('devicemotion', this.motionWatcher, true);
    setInterval(() => this.loop(this.state), 30);
  }

  alertError = err => alert(JSON.stringify(err));
  watcher = lastPosition => this.setState({ 
    latitude: lastPosition.coords.latitude,
    longitude: lastPosition.coords.longitude,
    speed: lastPosition.coords.speed,
  })
  motionWatcher = motion => this.setState({ motion })

  togglePause = () => this.setState({ paused: !this.state.paused })

  togglePrintData = id => {
    const data = Object.assign({}, this.state.kurt)
    data[id].show = !data[id].show
    this.setState({ kurt: data })
  }

  loop = sample => {
    if (sample.paused) return
    const data = Object.assign({}, sample.kurt)
    const {
      accelerationIncludingGravity = {},
      rotationRate = {},
      timeStamp = 0,
    } = sample.motion
    const accel = accelerationIncludingGravity
    const location = {
      latitude: sample.latitude,
      longitude: sample.longitude,
      speed: sample.speed,
    }

    const [out, counter] = kurt(accel, rotationRate, location, timeStamp, data, sample.counter)

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
