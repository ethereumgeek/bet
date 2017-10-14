import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createNewBet } from '../actions/'
import './Create.css'

const numericInputs = [
  'p1Wager', 'p2Wager', 'arbitrationFee', 'arbitrationBonus'
]

const emptyState = {
  statement: '',
  p1Address: '',
  p2Address: '',
  p1Wager: 0,
  p2Wager: 0,
  arbitrationAddress: '',
  arbitrationFee: 0,
  arbitrationBonus: 0,
  arbitrationTimeout: '',
}

const testState = {
  statement: 'Hello world!',
  p1Address: '0x37467b5a9d575a46dd7446a66a17339e4b7f47dc',
  p2Address: '0xec280d80ec3b1398a8bfc2d64f5b59bdc4b0462a',
  p1Wager: 0.01,
  p2Wager: 0.01,
  arbitrationAddress: '0xec280d80ec3b1398a8bfc2d64f5b59bdc4b0462a',
  arbitrationFee: 0.005,
  arbitrationBonus: 0,
  arbitrationTimeout: '',
}
class Create extends Component {
  constructor(props) {
    super(props);
    this.state = testState
  }

  handleInputChange = (e) => {
    let isNumeric = numericInputs.includes(e.target.name)
    e.preventDefault()
    this.setState({
      [e.target.name]: isNumeric ? Number(e.target.value) : e.target.value
    })
  }

  handleFocus = (e) => {
    e.target.select()
  }

  createBet = (e) => {
    e.preventDefault()
    this.props.createNewBet(
      this.state.p1Address,
      this.state.p2Address,
      this.state.arbiter,
      '',
      this.state.p1Wager,
      this.state.p2Wager,
      this.state.arbitrationFee,
      this.state.arbitrationBonus,
      this.state.arbitrationTimeout
    )
  }

  render() {
    return (
      <div>
        <h1>Create New Bet</h1>
        <form>
          <div className="form-group">
            <textarea className="form-control" rows="5"
              placeholder="What statement will you bet on?"
              name="statement"
              value={this.state.statement}
              onChange={this.handleInputChange}>
            </textarea>
          </div>
          <br />
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <label>Who believes this statement will be true?</label>
                <input className="form-control" placeholder="Address"
                  name="p1Address"
                  value={this.state.p1Address}
                  onChange={this.handleInputChange} />
              </div>
              <div className="col-md-6">
                <label>What will they wager?</label>
                <div className="input-group">
                  <input className="form-control" type="number" placeholder="Wager"
                    name="p1Wager"
                    value={this.state.p1Wager}
                    onChange={this.handleInputChange}
                    onFocus={this.handleFocus} />
                  <span className="input-group-addon">ETH</span>
                </div>
              </div>
            </div>
            <span className="pull-right">Total (including arbitration fees): {
              this.state.p1Wager + (this.state.arbitrationFee + this.state.arbitrationBonus) / 2
            }</span>
          </div>
          <br />
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <label>Who disagrees?</label>
                <input className="form-control" placeholder="Address"
                  name="p2Address"
                  value={this.state.p2Address}
                  onChange={this.handleInputChange} />
              </div>
              <div className="col-md-6">
                <label>What will they wager?</label>
                <div className="input-group">
                  <input className="form-control" type="number" placeholder="Wager"
                    name="p2Wager"
                    value={this.state.p2Wager}
                    onChange={this.handleInputChange}
                    onFocus={this.handleFocus} />
                  <span className="input-group-addon">ETH</span>
                </div>
              </div>
            </div>
            <span className="pull-right">Total (including arbitration fees): {
              this.state.p2Wager + (this.state.arbitrationFee + this.state.arbitrationBonus) / 2
            }</span>
          </div>
          <br />
          <div className="form-group">
            <label>Who will arbitrate this bet?</label>
            <input className="form-control" placeholder="Address"
              name="arbitrationAddress"
              value={this.state.arbitrationAddress}
              onChange={this.handleInputChange} />
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-md-6">
                <label>Arbitration Fee</label>
                <div className="input-group">
                  <input className="form-control" type="number" placeholder="Fee"
                    name="arbitrationFee"
                    value={this.state.arbitrationFee}
                    onChange={this.handleInputChange}
                    onFocus={this.handleFocus} />
                  <span className="input-group-addon">ETH</span>
                </div>
              </div>
              <div className="col-md-6">
                <label>Arbitration Bonus</label>
                <div className="input-group">
                  <input className="form-control" type="number" placeholder="Bonus"
                    name="arbitrationBonus"
                    value={this.state.arbitrationBonus}
                    onChange={this.handleInputChange}
                    onFocus={this.handleFocus} />
                  <span className="input-group-addon">ETH</span>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="form-group">
            <label>In case of a challenge, how long until the bet expires? (optional)</label>
            <div className="input-group">
              <input className="form-control" type="number" placeholder="Arbitration timeout"
                name="arbitrationTimeout"
                value={this.state.arbitrationTimeout}
                onChange={this.handleInputChange}
                onFocus={this.handleFocus} />
              <span className="input-group-addon">Days</span>
            </div>
          </div>
          <button className="btn pull-right create-btn" onClick={this.createBet}>Create Bet</button>
        </form>
      </div>
    )
  }
}

export default connect(null, { createNewBet })(Create);
