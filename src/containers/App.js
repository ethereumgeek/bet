import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAddress, fetchBets, setAddress } from "../actions/actions";
import { BetsList, Header, AddressSelection } from "../components/";
import "./App.css";

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
      <div className="App">
        <Header title='Twibet' />
        <div className="col-md-6 col-md-offset-3">
          <AddressSelection address={this.props.address} />
          <BetsList bets={this.props.bets} />

          <form className="form-inline">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Better" />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Arbiter" />
            </div>
            <div className="form-group">
              <input type="number" className="form-control" placeholder="Value" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    address: state.bets.address,
    error: state.bets.error,
    bets: state.bets.bets,
  };
};

export default connect(mapStateToProps, { fetchAddress, fetchBets, setAddress })(App);
