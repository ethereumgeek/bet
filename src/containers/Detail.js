import React, { Component } from "react";
import { connect } from 'react-redux'
import { blocksToDays } from '../utils/eth'
import './Details.css'

const testBet = {
  statement: 'Hello world!',
  p1Address: '0x37467b5a9d575a46dd7446a66a17339e4b7f47dc',
  p2Address: '0xec280d80ec3b1398a8bfc2d64f5b59bdc4b0462a',
  p1Wager: 0.01,
  p2Wager: 0.01,
  arbitrationAddress: '0xec280d80ec3b1398a8bfc2d64f5b59bdc4b0462a',
  arbitrationFee: 0.005,
  arbitrationBonus: 0,
  arbitrationTimeout: 0,
}

const truncate = str => str.substr(0, 16) + '...'

const ether = wei => window.web3.fromWei(parseInt(wei.toString(10)), 'ether')

class Detail extends Component {
  render() {
    const bet = this.props.bets[this.props.match.params.id]
    console.log(bet)

    if (!bet) return 'Loading...'

    const arbCosts = bet.args._arbitrationFee.plus(bet.args._arbiterBonus).dividedBy(2)
    const person1BuyIn = bet.args._person1Owes.plus(arbCosts)
    const person2BuyIn = bet.args._person2Owes.plus(arbCosts)

    console.log('p1owes', bet.args._person1Owes);
    console.log('buyin', person1BuyIn);

    return (
      <div>
        <div className="text-right">
          <span className="label label-success">Default</span>
        </div>
        <br />
        <div className="well">
          <p>{bet.args._textOfBet}</p>
        </div>
        <div className="panel panel-success">
          <div className="panel-heading">
            <strong>
              {truncate(bet.args._person1)} thinks the statement will be true
            </strong>
          </div>
          <div className="panel-body row">
            <div className="col-md-6">
              <h3>Wager: {ether(bet.args._person1Owes)} ETH</h3>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="btn-group pull-right wager-buttons">
                  <button className="btn btn-default">Buy In</button>
                  <button className="btn btn-default">Withdraw</button>
                  <button className="btn btn-default">Resolve</button>
                </div>
              </div>
              <div className="row text-right">
                <div className="col-xs-12">
                  <em>Total buy-in, including arbitration costs: {ether(person1BuyIn)} ETH</em>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="panel panel-danger">
          <div className="panel-heading text-right">
            <strong>
              {truncate(bet.args._person2)} thinks the statement will be false
            </strong>
          </div>
          <div className="panel-body row">
            <div className="col-md-6">
              <div className="row">
                <div className="btn-group wager-buttons">
                  <button className="btn btn-default">Buy In</button>
                  <button className="btn btn-default">Withdraw</button>
                  <button className="btn btn-default">Resolve</button>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <em>Total buy-in, including arbitration costs: {ether(person2BuyIn)} ETH</em>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h3 className="text-right">Wager: {ether(bet.args._person2Owes)} ETH</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div>
              <strong>Arbiter:</strong> {truncate(bet.args._arbiter)}
            </div>
            <div>
              <strong>Arbitration Fee:</strong> {ether(bet.args._arbitrationFee)} ETH
            </div>
            <div>
              <strong>Arbitration Bonus:</strong> {ether(bet.args._arbiterBonus)} ETH
            </div>
            {false
            ? <div><strong>Arbitration Timeout:</strong> {blocksToDays(bet.args._arbitrationMaxBlocks)} days</div>
            : null}
          </div>
          <div className="col-md-6">
            <div className="btn-group pull-right">
              <button className="btn btn-default">Buy In</button>
              <button className="btn btn-default">Withdraw</button>
              <button className="btn btn-default">Resolve</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    bets: state.bets.bets,
  };
};

export default connect(mapStateToProps, {})(Detail);
