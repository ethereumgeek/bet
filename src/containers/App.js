import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAddress, fetchBets } from '../actions/actions';
import logo from '../images/logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getAddress()
    this.props.fetchBets()
  }

  render() {
    return (
      <div className="App">
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

export default connect(mapStateToProps, {getAddress, fetchBets})(App);
