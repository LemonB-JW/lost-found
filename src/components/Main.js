import React, { Component } from 'react';
import { Register } from './Register';
import { Login } from './Login';
import {Home} from './Home';
import { Switch, Route, Redirect } from 'react-router-dom';

export class Main extends Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login handleLogin={this.props.handleLogin}/>;
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" render={this.getLogin}/>
                    <Route path="/register" component={Register}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/home" component={Home}/>
                    <Route render={this.getLogin}/>
                </Switch>
            </div>
        );
    }
}