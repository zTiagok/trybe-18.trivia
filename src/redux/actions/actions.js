export const SAVE_USER = 'SAVE_USER';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_GRAVATAR = 'SAVE_GRAVATAR';
export const SAVE_TIME = 'SAVE_TIME';
export const SAVE_SCORE = 'SAVE_SCORE';
export const DISABLE_BUTTON = 'DISABLE_BUTTON';
export const CALCULATE_SCORE = 'CALCULATE_SCORE';

export const saveUser = (user, email) => ({
  type: SAVE_USER,
  user,
  email,
});

export const saveTimer = (payload) => ({
  type: SAVE_TIME,
  payload,
});

export const saveScore = (payload) => ({
  type: SAVE_SCORE,
  payload,
});

export const disableButton = () => ({
  type: DISABLE_BUTTON,
  btnDisabled: true,
});

export const calculateScore = (payload) => (dispatch, getState) => {
  const { timer } = getState();
  const pontos = 10;
  if (payload === 'easy') {
    const pontEasy = 1;
    const obj = {
      score: (Number(timer.time) * pontEasy) + pontos,
    };
    dispatch(saveScore(obj));
  }
  if (payload === 'medium') {
    const pontMedium = 2;
    const obj = {
      score: (Number(timer.time) * pontMedium) + pontos,
    };
    dispatch(saveScore(obj));
  }
  if (payload === 'hard') {
    const pontHard = 3;
    // console.log('Time:', (Number(timer.time)));
    const obj = {
      score: (Number(timer.time) * pontHard) + pontos,
    };
    dispatch(saveScore(obj));
  }
};