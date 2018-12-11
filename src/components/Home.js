import React, { Component } from 'react';
import { GEO_OPTIONS } from '../constants';
import { Tabs, Button } from 'antd';

const TabPane = Tabs.TabPane;


export class Home extends Component {
    //
    state = {
        // check if it is loading geolocation
        loadingGeoLocation: false
    }

    componentDidMount() {
        this.setState({ loadingGeoLocation: true});
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
        // stop showing "loading"
        this.setState({ loadingGeoLocation: false});
        console.log(pos);
    }

    onFailedLoad = (err) => {
        // stop showing "loading"
        this.setState({ loadingGeoLocation: true});
        console.log(err);
    }
    render() {
        const operations = <Button type="primary" icon="upload">I Want to Post!</Button>;
        return (
            <div className="tabs">
              <Tabs tabBarExtraContent={operations}>
                <TabPane tab="Post" key="1">{this.state.loadingGeoLocation ? "loading" : "not loading"}</TabPane>
                <TabPane tab="Map" key="2">Content of tab 2</TabPane>
              </Tabs>
            </div>
        )
    };

}