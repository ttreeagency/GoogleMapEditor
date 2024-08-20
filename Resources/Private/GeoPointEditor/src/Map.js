import React from 'react';
import { compose, withProps, lifecycle } from 'recompose'
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps'
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"

const point = event => [event.latLng.lat(), event.latLng.lng()];

const Map = compose(
    withProps({
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            this.setState({
                searchTerm: null,
                onSearchTermChange: event => this.setState({searchTerm: event.target.value}),
                markers: [],
                onMapMounted: ref => {
                    refs.map = ref;
                },
                onBoundsChanged: () => {
                    this.setState({
                        bounds: refs.map.getBounds(),
                        center: refs.map.getCenter(),
                    })
                },
                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                searchInputRef: ref => {
                    refs.searchInput = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = nextMarkers[0]?.position || this.state.center;
                    this.props.onClick([nextCenter.lat(), nextCenter.lng()]);
                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                        searchTerm: ''
                    });
                    refs.map.fitBounds(bounds);
                },
            })
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap
        ref={props.onMapMounted}
        defaultCenter={props.center}
        defaultZoom={props.defaultZoom}
        defaultOptions={props.defaultOptions}
        onClick={(event) => props.onClick(point(event))}
    >
        {props.search && (<SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={google.maps.ControlPosition.TOP_LEFT}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                ref={props.searchInputRef}
                value={props.searchTerm === null ? props.defaultSearchTerm : props.searchTerm}
                placeholder={props.searchPlaceholder}
                onChange={props.onSearchTermChange}
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `210px`,
                    height: `32px`,
                    marginTop: `10px`,
                    marginLeft: `10px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
            />
        </SearchBox>)}
        <Marker position={props.position} onClick={props.onMarkerClick} />
    </GoogleMap>
);

export default Map;
