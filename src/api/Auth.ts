import { fetchWrapper } from "./fetchWrapper";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const isLoggedIn = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/authenticate`, fetchWrapper({}));

  if (!response.ok) {
    localStorage.clear()
    throw new Error("Unauthorized");
  }

  return response.json()
};
