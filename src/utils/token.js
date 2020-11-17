const ID_TOKEN_KEY = "token";

export const getToken = () => localStorage.getItem(ID_TOKEN_KEY);

export const saveToken = (token) => localStorage.setItem(ID_TOKEN_KEY, token);

export const destroyToken = () => localStorage.removeItem(ID_TOKEN_KEY);

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getToken,
  saveToken,
  destroyToken,
};
