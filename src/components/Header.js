import React, { Component } from 'react';
import logo from '../assets/logo2.png';
import { Icon } from 'antd';


export class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src= { logo } className="App-logo" alt="logo" />
                <h1 className="App-title">Pet Lost & Found</h1>
                {
                    this.props.isLoggedIn ?
                        <a className="logout"
                           onClick={this.props.handleLogout}
                        >
                            <Icon type="logout" />{' '}Logout
                        </a> : null
                }

            </header>
        );
    }
}