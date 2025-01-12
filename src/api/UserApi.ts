import { loginFormType } from "../components/forms/SignIn";
import { userRegistrationType } from "../components/forms/UserRegistration";
import { User } from "../types/types";
import { fetchWrapper } from "./fetchWrapper";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (formData: userRegistrationType) => {
  const response = await fetch(`${API_BASE_URL}/user/register`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }
};

export const loginUser = async (formData: loginFormType) => {
  const response = await fetch(`${API_BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to Logged in");
  }

  let jsonResponse = await response.json()
  localStorage.setItem('auth_token', JSON.stringify(jsonResponse.auth_token))

  return jsonResponse.auth_token
};

export const logoutUser = async () => {
  localStorage.removeItem('auth_token')
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  if(!response.ok) {
    throw new Error('Failed to logout user')
  }
}

export const fetchCurrentUser = async ():Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/user/me`, fetchWrapper({}))

  if(!response.ok) {
    throw new Error('Error fetching user')
  }

  return response.json()
}
