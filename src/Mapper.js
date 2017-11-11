import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Map extends Component {
    static propTypes  = {
        latitude: PropTypes.number,
        longitude: PropTypes.number,
    };

    render() {
        return <GoogleMap defaultZoom={8} >
            {this.props.latitude && this.props.longitude && <Marker position={{ lat: this.props.latitude, lng: this.props.longitude }} />}
        </GoogleMap>;
    }
}

export default withScriptjs(withGoogleMap(Map));