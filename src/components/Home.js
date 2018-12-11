import React, { Component } from 'react';
import { GEO_OPTIONS } from '../constants';

export class Home extends Component {
    componentDidMount() {
        this.getGeoLocation();
    }

    getGeoLocation = ()=> {
        // check if browser support "geolocation"
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              this.onSuccessLoad,
              this.onFailedLoad,
              GEO_OPTIONS
            );
        } else {

        }
    }

    onSuccessLoad = (pos) => {
        console.log(pos);
    }

    onFailedLoad = (err) => {
        console.log(err);
    }
    render() {
        return (
            <div>
                This is Home!
            </div>
        )
    }
}