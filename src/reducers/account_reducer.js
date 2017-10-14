const INITIAL_STATE = {
  address: '',
  balance: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return Object.assign({}, state, {
        address: action.address
      });
    case "SET_ERROR":
      return Object.assign({}, state, {
        error: action.error
      });
    case "SET_BETS":
      return Object.assign({}, state, {
        bets: action.bets
      });
    default:
      return state;
  }
}
