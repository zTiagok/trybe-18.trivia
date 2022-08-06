export const getToken = async () => {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const getTrivia = async (token) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(url);
  const data = response.json();
  return data;
};
