export const STORAGE_TOKEN_KEY = "token";
export const STORAGE_REFRESH_TOKEN_KEY = "refresh-token";

export const setToken = (token: string) =>
  uni.setStorageSync(STORAGE_TOKEN_KEY, token);
export const getToken = () => uni.getStorageSync(STORAGE_TOKEN_KEY);
export const removeToken = () => uni.removeStorageSync(STORAGE_TOKEN_KEY);

export const setRefreshToken = (token: string) =>
  uni.setStorageSync(STORAGE_REFRESH_TOKEN_KEY, token);
export const getRefreshToken = () =>
  uni.getStorageSync(STORAGE_REFRESH_TOKEN_KEY);
export const removeRefreshToken = () =>
  uni.removeStorageSync(STORAGE_REFRESH_TOKEN_KEY);

export const clearTokens = () => {
  removeToken();
  removeRefreshToken();
};

export const setTokens = ({
  token,
  refreshToken,
}: Partial<{ token: string; refreshToken: string }>) => {
  let count = 0;
  if (token) {
    setToken(token);
    count++;
  }
  if (refreshToken) {
    setRefreshToken(refreshToken);
    count++;
  }

  return count;
};
