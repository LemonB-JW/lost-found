import React, { Component } from 'react';
import { Register } from './Register';
import { Login } from './Login';
import {Home} from './Home';
import { Switch, Route } from 'react-router';

export class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={this.getRoot}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/home" component={Home}/>
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        );
    }
}