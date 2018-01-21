import React from 'react';
import { compose, withProps } from 'recompose'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'

const point = event => [event.latLng.lat(), event.latLng.lng()];

const Map = compose(
    withProps({
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        defaultCenter={props.center}
        defaultZoom={props.defaultZoom}
        defaultOptions={props.defaultOptions}
        onClick={(event) => props.onClick(point(event))}
    >
        <Marker position={props.position} onClick={props.onMarkerClick} />
    </GoogleMap>
);

export default Map;
