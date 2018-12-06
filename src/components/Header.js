import React, { Component } from 'react';
import logo from '../assets/logo2.png';


export class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src= { logo } className="App-logo" alt="logo" />
                <h1 className="App-title">Pet Lost & Found</h1>
            </header>
        )
    }
}