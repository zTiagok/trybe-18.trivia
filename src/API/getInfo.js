const url = 'https://opentdb.com/api_token.php?command=request';

export const getToken = async () => {
  const response = await fetch(url);
  const data = response.json();
  return data;
};

export const getTrivia = async () => {

};
