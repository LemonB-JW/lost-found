import React, { Component } from 'react';
import $ from 'jquery';
import { GEO_OPTIONS } from '../constants';
import { Tabs, Button, Spin } from 'antd';
import { API_ROOT } from '../constants'
import { AUTH_PREFIX } from '../constants';
import {Gallery} from './Gallery';
import { CreatePost } from './CreatePost';
import { WrappedMap } from './Map';

const TabPane = Tabs.TabPane;


export class Home extends Component {
    //
    state = {
        // check if it is loading geolocation
        loadingGeoLocation: false,
        loadingPosts: false,
        error: '',
        posts: []
    }

    componentDidMount() {
        this.getGeoLocation();
    }

    getGeoLocation = ()=> {
        this.setState({ loadingGeoLocation: true, error: ''});
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
            console.log(response);
            this.setState({ posts: response, loadingPosts: false, error: ''});
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
        } else if (this.state.posts && this.state.posts.length > 0) {
            // map info in posts to images info
            console.log("Post!");
            const images = this.state.posts.map((post) => {
              return {
                user: post.user,
                src: post.url,
                thumbnail: post.url,
                caption: post.message,
                thumbnailWidth: 400,
                thumbnailHeight: 300
              };
            });
            return <Gallery images={images}/>;
        } else {
          const temp = [
            {
              src: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_b.jpg",
              thumbnail: "https://c7.staticflickr.com/9/8106/28941228886_86d1450016_n.jpg",
              thumbnailWidth: 271,
              thumbnailHeight: 320,
              tags: [{value: "Nature", title: "Nature | Flowers"}],
              caption: "Orange Macro (Tom Eversley - isorepublic.com)"
            },
            {
              src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
              thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
              thumbnailWidth: 320,
              thumbnailHeight: 190,
              tags: [{value: "Architecture", title: "Architecture | Outdoors"},
                {value: "Industrial", title: "Industrial"}],
              caption: "286H (gratisography.com)"
            }
          ];

          return <Gallery images={temp}/>;
        }
    }


    render() {
        const operations = <CreatePost loadNearbyPost={this.loadNearbyPost}/>;

        return (
            <div className="main-tabs">
              <Tabs tabBarExtraContent={operations}>
                <TabPane
                  tab="Post" key="1">
                  {this.getGalleryPanelContent()}
                  </TabPane>
                <TabPane tab="Map" key="2">
                  <WrappedMap
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=youkey&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </TabPane>
              </Tabs>
            </div>

        )
    };

}