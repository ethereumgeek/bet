import { SET_ADDRESS, SET_ERROR, SET_BETS, CREATE_NEW_BET, NEW_SINGLE_BET } from '../actions';

const initial = {
  address: "",
  bets: [],
  error: null
};

export default function bets(state = initial, action) {
  switch (action.type) {
    case SET_ADDRESS:
      return Object.assign({}, state, {
        address: action.address
      });
    case SET_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });
    case NEW_SINGLE_BET:
      return {...state, bets: [...state.bets, action.payload]}
    case CREATE_NEW_BET:
      return Object.assign({})
    default:
      return state;
  }
}
