import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class BetsList extends Component {
  handleLinkClicked = index => {
    this.props.history.push(`/bets/${index}`)
  }

  render() {
    const { bets } = this.props
    return (
      <table className="table bg-color-white">
        <tbody>
          {bets.map( (bet, id) => (
            <tr key={id}>
              <td>
                <a href={`/bets/${id}`}>
                  {bet.args._textOfBet}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

const mapStateToProps = state => {
  return {
    bets: state.bets.bets,
  };
}

const BetsListWrapper = connect(mapStateToProps, {})(withRouter(BetsList))
export { BetsListWrapper as BetsList }
