import { combineReducers } from 'redux';
import bets from './bets';

const rootReducer = combineReducers({
  bets,
});

export default rootReducer;
