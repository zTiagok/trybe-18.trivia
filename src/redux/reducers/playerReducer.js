import { SAVE_EMAIL, SAVE_GRAVATAR, SAVE_USERNAME } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
  email: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USERNAME:
    return {
      ...state,
      name: action.user,
    };

  case SAVE_EMAIL:
    return {
      ...state,
      email: action.email,
    };

  case SAVE_GRAVATAR:
    return {
      ...state,
      gravatarEmail: action.gravatarEmail,
    };

  default:
    return state;
  }
};

export default player;
