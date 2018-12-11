import React, { Component } from 'react';
import { GEO_OPTIONS } from '../constants';
import { Tabs, Button } from 'antd';

const TabPane = Tabs.TabPane;


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
      const operations = <Button type="primary" icon="upload">I Want to Post!</Button>;
      return (
            <div className="tabs">
              <Tabs tabBarExtraContent={operations}>
                <TabPane tab="Post" key="1">Content of tab 1</TabPane>
                <TabPane tab="Map" key="2">Content of tab 2</TabPane>
              </Tabs>
            </div>
        )
    }

}