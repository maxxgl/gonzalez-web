import React, { Component } from 'react';
import './map-style.css'
import ReactMapGL, {
  Marker,
  NavigationControl,
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapStyle from './mapbox-map-style'

export default class Mapper extends Component {
  state = {
    viewport: {
      width: "100%",
      height: "calc(100vh - 22em)",
      zoom: 12,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
    },
  }

  updateViewport = viewport => this.setState({ viewport })

  componentDidUpdate = (prevProps) => {
    if (this.props !== prevProps) {
      this.setState({ ...this.props })
    }
  }

  render() {
    const { latitude, longitude } = this.state.viewport
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapStyle={mapStyle}
        latitude={latitude}
        longitude={longitude}
        mapboxApiAccessToken="pk.eyJ1IjoibWF4eGdsIiwiYSI6ImNqcDlwaHh5cTJkMW8zcG8xNnZkY2Ezd24ifQ.mot4rsPMMBORpbTmYfDIGA"
        onViewportChange={this.updateViewport}
      >
        <Marker
          latitude={this.props.latitude}
          longitude={this.props.longitude}
        >
          <span className="map-marker">x</span>
        </Marker>
        <PositionMarkers positions={this.props.positions || []} />
        <div className='map-nav'>
          <NavigationControl onViewportChange={this.updateViewport} />
        </div>
      </ReactMapGL>
    );
  }
}

const PositionMarkers = ({ positions }) => positions.map((p, i) => (
  <Marker key={i} latitude={p.latitude} longitude={p.longitude}>
    <span className="position-marker">x</span>
  </Marker>
))
