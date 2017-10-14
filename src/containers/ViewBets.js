import React from 'react'
import { connect } from 'react-redux'
import { BetsList } from '../components'

const ViewBets = (props) => (
  <div>
    <h1>ViewBets.js</h1>
    <BetsList bets={props.bets}></BetsList>
  </div>

)

const mapStateToProps = state => {
  return {
    bets: state.bets.bets,
  };
};

export default connect(mapStateToProps, {})(ViewBets);
