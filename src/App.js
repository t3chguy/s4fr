import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from "./Mapper";

const geolocation = navigator.geolocation;

const geo_options = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000
};

export default class App extends Component {
    constructor(props, context) {
        super(props, context);

        if ('geolocation' in navigator) {
            this.watchID = geolocation.watchPosition((position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            }, console.error, geo_options);
        }

        this.state = {
            latitude: null,
            longitude: null,
        };
    }

    componentWillUnmount() {
        geolocation.clearWatch(this.watchID);
    }

    render() {
        if (!this.watchID) return <div>Missing Geolocation Support</div>;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Travel Toolbox</h1>
                    <h4>Your new travel companion.</h4>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <h6>
                    {this.state.latitude}, {this.state.longitude}
                    <Map latitude={this.state.latitude} longitude={this.state.longitude}
                         googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                         loadingElement={<div style={{ height: `100%` }} />}
                         containerElement={<div style={{ height: `400px` }} />}
                         mapElement={<div style={{ height: `100%` }} />}
                    />
                </h6>
            </div>
        );
    }
}
