import { SAVE_SCORE, SAVE_USER } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      name: action.user,
      gravatarEmail: action.email,
    };

  case SAVE_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };

  default:
    return state;
  }
};

export default player;
