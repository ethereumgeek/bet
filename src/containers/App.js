import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAddress, fetchBets } from '../actions/actions';
import logo from '../images/logo.svg';
import './App.css';

class App extends Component {
  componentWillMount() {
    this.props.fetchAddress()
  }

  render() {
    return (
      <div className="App">
        <table className="table">
          <thead>
            <tr>
              <th>Better</th>
              <th>Arbiter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {this.props.bets.map(bet => (
              <tr>
                <td>bet.better</td>
                <td>bet.arbiter</td>
                <td>bet.value</td>
              </tr>
            ))}
          </tbody>
        </table>
        <form className="form-inline">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Better"/>
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Arbiter"/>
          </div>
          <div className="form-group">
            <input type="number" className="form-control" placeholder="Value"/>
          </div>
        </form>
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

export default connect(mapStateToProps, {fetchAddress, fetchBets})(App);
