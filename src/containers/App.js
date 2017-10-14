import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { initializeWeb3 } from "../actions/";
import { Header, AddressSelection } from "../components/";
import "./App.css";

import Create from './Create'
import ViewBets from './ViewBets'

class App extends Component {
  componentWillMount() {
    this.props.initializeWeb3();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header title='Twibet' />
          <div className="col-md-6 col-md-offset-3">
            <AddressSelection address={this.props.address} balance={this.props.balance}></AddressSelection>
            <Route exact path="/" component={ViewBets}/>
            <Route path="/create" component={Create}/>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.account.address,
    balance: state.account.balance,
    error: state.bets.error,
  };
};

export default connect(mapStateToProps, { initializeWeb3 })(App);
