import { combineReducers } from 'redux';
import bets from './bets';
import account from './account_reducer';

const rootReducer = combineReducers({
  bets,
  account,
});

export default rootReducer;
