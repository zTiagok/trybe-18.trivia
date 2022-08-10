import { SAVE_TIME } from '../actions/actions';

const INITIAL_STATE = {
  time: 0,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_TIME:
    return {
      ...state,
      time: action.payload,
    };
  default:
    return state;
  }
};

export default timer;
