import { HotelType } from "../types/types";
import { fetchWrapper } from "./fetchWrapper";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const registerHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/my-hotels`, fetchWrapper({
    method: 'POST',
    body: hotelFormData
  }))

  if(!response.ok) {
    throw new Error('Failed to register hotel')
  }

  return response.json()
}

export const fetchUserHotels = async ():Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/my-hotels`, fetchWrapper({}))

  if(!response.ok) {
    throw new Error('Error fetching hotels')
  }

  return response.json()
}

export const fetchHotelById = async (hotelId: string):Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/my-hotels/${hotelId}`, fetchWrapper({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }))

  if(!response.ok) {
    throw new Error('Error fetching hotel by Id')
  }

  return response.json()
}

type UpdateHotelParamterType = {
  id: string;
  hotelData: FormData
}
export const updateHotel = async (hotel: UpdateHotelParamterType):Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/my-hotels/${hotel.id}`, fetchWrapper({
    method: 'PUT',
    body: hotel.hotelData
  }))

  if(!response.ok) {
    throw new Error('Error Updating hotel')
  }

  return response.json()
}