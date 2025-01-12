import { HotelType } from "../types/types";
import { fetchWrapper } from "./fetchWrapper";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchMyBookings = async():Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/bookings`, fetchWrapper({}))

  if(!response.ok) {
    throw new Error('Error fetching bookings')
  }

  return response.json()
}