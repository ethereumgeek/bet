const INITIAL_STATE = {
  address: '',
  balance: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_ADDRESS":
      return { ...state, address: action.payload}
    case "GET_BALANCE":
      return { ...state, balance: action.payload}
    default:
      return state;
  }
}
