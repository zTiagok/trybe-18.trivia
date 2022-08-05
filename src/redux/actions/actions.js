export const SAVE_USERNAME = 'SAVE_USERNAME';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_GRAVATAR = 'SAVE_GRAVATAR';

export const saveUsername = (user) => ({
  type: SAVE_USERNAME,
  user,
});

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveGravatar = (gravatarEmail) => ({
  type: SAVE_GRAVATAR,
  gravatarEmail,
});
