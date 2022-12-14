import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import player from './reducers/playerReducer';
import timer from './reducers/timerReducer';

export const rootReducer = combineReducers({
  player,
  timer,
});

const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

if (window.Cypress) {
  window.store = Store;
}

export default Store;
