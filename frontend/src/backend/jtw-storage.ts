const TOKEN_KEY = "app_auth_token";

export const setToken = (token: string) => {
  // Store token in localStorage
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
