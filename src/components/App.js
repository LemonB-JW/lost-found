import React, { Component } from 'react';
import { Header } from './Header'
import '../styles/App.css';
import { Main } from './Main.js'

class App extends Component {
  state = {
      isLoggedIn: Boolean(localStorage.getItem('TOKEN_KEY'))
  }

  handleLogin = (token) => {
      // store token
      localStorage.setItem('TOKEN_KEY', token);
      this.setState({ isLoggedIn: true });
  }

  handleLogout = () => {
      localStorage.removeItem('TOKEN_KEY');
      this.setState({ isLoggedIn: false });
  }
  render() {
    return (
      <div className="App">
        <Header isLoggedIn = {this.state.isLoggedIn} handleLogout={this.handleLogout}/>
        <Main isLoggedIn = {this.state.isLoggedIn} handleLogin={this.handleLogin}/>
      </div>
    );
  }
}

export default App;
