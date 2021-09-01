export const getAccessToken: () => string = () => {
  return sessionStorage.getItem("accessToken") ?? "";
};

export const setAccessToken: (token: string) => void = (token: string) => {
  sessionStorage.setItem("accessToken", token);
};
