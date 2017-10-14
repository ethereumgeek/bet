import React, { Component } from 'react';
import { connect } from 'react-redux';
import { init, fetchBets } from '../actions/actions';
import logo from '../images/logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.init();
    if (this.props.address) {
      this.props.fetchBets()
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {this.props.bets.map(bet => <li>{bet.better}</li>)}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.bets.address,
    error: state.bets.error,
    bets: state.bets.bets,
  }
}

export default connect(mapStateToProps, {init, fetchBets})(App);
