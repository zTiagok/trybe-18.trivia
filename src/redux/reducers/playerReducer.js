import { DISABLE_BUTTON, SAVE_SCORE, SAVE_USER } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  btnDisabled: false,
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

  case DISABLE_BUTTON:
    return {
      ...state,
      btnDisabled: action.btnDisabled ? !action.btnDisabled : !action.btnDisabled,
    };

  default:
    return state;
  }
};

export default player;
