export const SAVE_USER = 'SAVE_USER';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_GRAVATAR = 'SAVE_GRAVATAR';
export const SAVE_TIME = 'SAVE_TIME';
export const SAVE_SCORE = 'SAVE_SCORE';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';

export const saveUser = (user, email) => ({
  type: SAVE_USER,
  user,
  email,
});

export const timer = (payload) => ({
  type: SAVE_TIME,
  payload,
});

export const saveScore = (score) => ({
  type: SAVE_SCORE,
  score,
});

export const disableButton = () => ({
  type: DISABLE_BUTTON,
  btnDisabled: true,
});
