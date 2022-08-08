export const SAVE_USER = 'SAVE_USER';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_GRAVATAR = 'SAVE_GRAVATAR';

export const saveUser = (user, email) => ({
  type: SAVE_USER,
  user,
  email,
});
