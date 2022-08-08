import { SAVE_USER } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
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

  default:
    return state;
  }
};

export default player;
