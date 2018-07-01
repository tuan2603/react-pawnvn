import React, {Component} from 'react';
import {withScriptjs, withGoogleMap, GoogleMap, Marker} from "react-google-maps";
import {SearchBox} from "react-google-maps/lib/components/places/SearchBox";
import _ from "lodash";

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            map: null,
            center: this.props.center,
            bounds: null,
            searchBox: null,
        };
        this.mapLoaded = this.mapLoaded.bind(this);
        this.mapMoved = this.mapMoved.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this);
        this.onPlacesChanged = this.onPlacesChanged.bind(this);
        this.onBoundsChanged = this.onBoundsChanged.bind(this);

    }


    onMarkerClick(map) {
        let obj = JSON.parse(JSON.stringify(map));
        //console.log(obj.latLng);
        if (obj.latLng == null) {
            return;
        }
        this.setState({center: obj.latLng});
        if (this.state.center) {
            this.props.onAddMap({lat:obj.latLng.lat,lng:obj.latLng.lng});
        }
    }

    mapMoved() {
        this.setState({
            center: JSON.parse(JSON.stringify(this.state.map.getCenter())),
        });

        if (this.state.center) {
            this.props.onAddMap({lat:this.state.center.lat,lng:this.state.center.lng});
        }
    }

    onBoundsChanged() {
        this.setState({
            bounds: JSON.parse(JSON.stringify(this.state.map.getBounds())),
        });
        if (this.state.center) {
            //console.log(this.state.center);
            this.props.onAddMap({lat:this.state.center.lat,lng:this.state.center.lng});
        }
    }

    onPlacesChanged() {
        const places = this.state.searchBox.getPlaces();
        const bounds = new window.google.maps.LatLngBounds();

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
        const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

        this.setState({
            center: JSON.parse(JSON.stringify(nextCenter)),
            markers: nextMarkers,
        });
    }

    mapLoaded(map) {
        if (this.state.map != null) {
            return;
        }
        this.setState({
            map: map
        })
    }

    onSearchBoxMounted(searchBox) {
        if (this.state.searchBox != null) {
            return;
        }
        this.setState({
            searchBox: searchBox
        })
    }

    render() {
        const {isMarkerShown, zoom} = this.props || [];
        const {bounds, center} = this.state;
        return (
            <GoogleMap
                ref={this.mapLoaded}
                onDragEnd={this.mapMoved}
                defaultZoom={zoom}
                center={center}
                onBoundsChanged={this.onBoundsChanged}
            >
                <SearchBox
                    ref={this.onSearchBoxMounted}
                    controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
                    onPlacesChanged={this.onPlacesChanged}
                    bounds={bounds}
                >
                    <input
                        type="text"
                        placeholder="Tìm vị trí"
                        style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `240px`,
                            height: `32px`,
                            marginTop: `27px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            color: 'black',
                            textOverflow: `ellipses`,
                        }}
                    />
                </SearchBox>
                {
                    isMarkerShown &&
                    <Marker position={center}
                            draggable={true}
                            onDragEnd={this.onMarkerClick}
                    />
                }

            </GoogleMap>
        );
    }
}

export default withScriptjs(withGoogleMap(Map));
