import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';

import playerReducer from './reducers/playerReducer';

export const rootReducer = combineReducers({
  playerReducer,
});

const Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

if (window.Cypress) {
  window.store = Store;
}

export default Store;
