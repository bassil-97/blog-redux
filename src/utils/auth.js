import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

// Get User Token
export const getAuthToken = () => {
  const token = localStorage.getItem("userToken");

  // if (!token) return null;

  // const tokenDuration = getTokenDuration();

  // if (tokenDuration < 0) {
  //   return "EXPIRED";
  // }

  return token;
};
export const getUserData = () => JSON.parse(localStorage.getItem("userData"));

export function checkAuthLoader() {
  const token = getAuthToken();
  if (!token) return redirect("/auth");
  return null;
}
