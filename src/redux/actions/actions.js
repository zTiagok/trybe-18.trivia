export const SAVE_USER = 'SAVE_USER';
export const SAVE_SCORE = 'SAVE_SCORE';

export const saveUser = (user, email) => ({
  type: SAVE_USER,
  user,
  email,
});

export const saveScore = (score) => ({
  type: SAVE_SCORE,
  score,
});
