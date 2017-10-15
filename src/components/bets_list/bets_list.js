import React from 'react';

const BetsList = ({bets}) => {
  return (
    <table className="table bg-color-white">
      <thead>
        <tr>
          <th>Better</th>
          <th>Arbiter</th>
          <th>Value</th>
          <th>Challenge Content</th>
        </tr>
      </thead>
      <tbody>
        {bets.map( (bet, id) => (
          <tr key={id}>
            <td>{bet.better}</td>
            <td>{bet.arbiter}</td>
            <td>{bet.value}</td>
            {/* <td>{bet.content}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export { BetsList };
