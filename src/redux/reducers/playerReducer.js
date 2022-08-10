import { DISABLE_BUTTON, SAVE_SCORE, SAVE_USER } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
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
    console.log('Reducer score:', action.payload.score);
    return {
      ...state,
      score: state.score + action.payload.score,
      assertions: state.assertions + 1,
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
