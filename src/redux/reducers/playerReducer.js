import {
  DISABLE_BUTTON,
  SAVE_GAME,
  SAVE_SCORE,
  SAVE_USER,
  SAVE_ICON,
  CLEAR_GAME } from '../actions/actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  hashcode: '',
  btnDisabled: false,
  saveGame: [],
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      name: action.user,
      gravatarEmail: action.email,
      hashcode: action.hashcode,
    };

  case SAVE_SCORE:
    console.log('Reducer score:', action.payload);
    return {
      ...state,
      score: state.score + action.payload.score,
      assertions: state.assertions + 1,
    };

  case SAVE_GAME:
    return {
      ...state,
      saveGame: [...state.saveGame, action.payload],
    };

  case DISABLE_BUTTON:
    return {
      ...state,
      btnDisabled: action.btnDisabled ? !action.btnDisabled : !action.btnDisabled,
    };

  case SAVE_ICON:
    return {
      ...state,
      hashcode: action.payload,
    };

  case CLEAR_GAME:
    return {
      ...state,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      hashcode: '',
      btnDisabled: false,
      saveGame: [],
    };

  default:
    return state;
  }
};

export default player;
