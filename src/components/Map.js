import React, { Component } from 'react';
import { GoogleMap, InfoWindow, Marker, withScriptjs, withGoogleMap  } from 'react-google-maps';

class Map extends Component {
  render() {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 39.9533846, lng: -75.18 }}
      >
        <Marker
          position={{ lat: -34.397, lng: 150.644 }}
        >
        </Marker>
      </GoogleMap>
    );
  }
}

export const WrappedMap = withScriptjs(withGoogleMap(Map));