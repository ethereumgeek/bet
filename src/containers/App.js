import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { fetchAddress, fetchBets, setAddress } from "../actions/actions";
import { Header, AddressSelection } from "../components/";
import "./App.css";

import Create from './Create'
import ViewBets from './ViewBets'

class App extends Component {
  componentWillMount() {
    this.props.fetchAddress();
    this.props.fetchBets();
  }

  // componentWillReceiveProps(newProps) {
  //   if(this.props.address === '') {
  //     this.props.setAddress(newProps.address)
  //   }
  // }

  render() {
    return (
      <Router>
        <div className="App">
          <Header title='Twibet' />
          <div className="col-md-6 col-md-offset-3">
            <AddressSelection address={this.props.address}></AddressSelection>
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
    address: state.bets.address,
    error: state.bets.error,
  };
};

export default connect(mapStateToProps, { fetchAddress, fetchBets, setAddress })(App);
