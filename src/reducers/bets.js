const initial = {
  address: "",
  bets: [],
  newBet: {},
  error: null
};

export default function bets(state = initial, action) {
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
    case "CREATE_NEW_BET":
      return Object.assign({})
    default:
      return state;
  }
}
