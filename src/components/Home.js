import React, { Component } from 'react';
import $ from 'jquery';
import { GEO_OPTIONS } from '../constants';
import { Tabs, Button, Spin } from 'antd';
import { API_ROOT } from '../constants'
import { AUTH_PREFIX } from '../constants';

const TabPane = Tabs.TabPane;


export class Home extends Component {
    //
    state = {
        // check if it is loading geolocation
        loadingGeoLocation: false,
        loadingPosts: false,
        error: ''
    }

    componentDidMount() {
        this.setState({ loadingGeoLocation: true, error: ''});
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
            this.setState({ error: 'Sorry, your browser does not support geolocation'});
        }
    }


    onSuccessLoad = (pos) => {
        // stop showing "loading"
        this.setState({ loadingGeoLocation: false, error: ''});
        // get exact coordinates;
        const {latitude, longitude} = pos.coords;
        localStorage.setItem('POS_KEY', JSON.stringify({lat: latitude, lon: longitude}));
        console.log(pos);
        this.loadNearbyPost();

    }

    onFailedLoad = (err) => {
        // stop showing "loading"
        this.setState({ loadingGeoLocation: true});
        this.setState({ error: 'Sorry, we could not get your geolocation.'});
        console.log(err);
    }


    // Load posts whose geo information is around you
    loadNearbyPost = () => {
        this.setState({ loadingPosts: true, error: ''});
        // get geolocation key from localStorage
        const {lat, lon} = JSON.parse(localStorage.getItem('POS_KEY'));
      $.ajax({
        url: `${API_ROOT}/search?lat=${lat}&lon=${lon}&range=200`,
        method: 'GET',
        headers: {
            Authorization: `${AUTH_PREFIX} ${localStorage.getItem('TOKEN_KEY')}`,
         }
        }).then((response) => {
            console.log(response)
            this.setState({ loadingPosts: false });
      }, (err) => {
            console.log(err.responseText);
            this.setState({ loadingPosts: false });
            this.setState({ error: 'Sorry, loading posts failed!'});
      }).catch((err) => {
            console.log(err);
        });
    }

    getGalleryPanelContent = () => {
        if (this.state.error) {
            return <div>{this.state.error}</div>;
        } else if (this.state.loadingGeoLocation) {
            return  <Spin tip="Loading Geolocation..."/>;
        } else if (this.state.loadingPosts) {
            return  <Spin tip="Loading Posts..."/>;

        } else {

        }
    }


    render() {
        const operations = <Button type="primary" icon="upload">I Want to Post!</Button>;
        return (
            <div className="tabs">
              <Tabs tabBarExtraContent={operations}>
                <TabPane
                  tab="Post" key="1">
                  {this.getGalleryPanelContent()}
                  </TabPane>
                <TabPane tab="Map" key="2">Content of tab 2</TabPane>
              </Tabs>
            </div>

        )
    };

}