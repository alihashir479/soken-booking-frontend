import { loginFormType } from "../components/forms/SignIn";
import { userRegistrationType } from "../components/forms/UserRegistration";


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
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("Failed to Logged in");
  }
};

export const logoutUser = async () => {
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
