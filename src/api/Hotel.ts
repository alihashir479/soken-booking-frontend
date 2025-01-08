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
type SearchQueryParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  stars?: string[];
  types?: string[];
  price?: string;
  sortOptions?: string;
}

type HotelSearchResponse = {
  data: HotelType[],
  pagination: {
    page: number;
    total: number;
    pages: number;
  }
}
export const fetchAllHotels = async (searchQueryParams: SearchQueryParams):Promise<HotelSearchResponse> => {
  const params = new URLSearchParams()
  params.append('destination', searchQueryParams.destination || '')
  params.append('checkIn', searchQueryParams.checkIn || '')
  params.append('checkOut', searchQueryParams.checkOut || '')
  params.append('adultCount', searchQueryParams.adultCount || '')
  params.append('childCount', searchQueryParams.childCount || '')
  params.append('page', searchQueryParams.page || '')

  params.append('price', searchQueryParams.price || '')
  params.append('sortOptions', searchQueryParams.sortOptions || '')

  params.append('stars', Array.isArray(searchQueryParams.stars) ? searchQueryParams.stars.join(',') : '')
  params.append('types', Array.isArray(searchQueryParams.types) ? searchQueryParams.types.join(',') : '')
  params.append('facilities', Array.isArray(searchQueryParams.facilities) ? searchQueryParams.facilities.join(',') : '')

  const response = await fetch(`${API_BASE_URL}/hotels/search?${params}`)

  if(!response.ok) {
    throw new Error('Error fetching hotels')
  }

  return response.json()
}

// this is for detail page, not auth user
export const fetchHotel = async (hotelId: string):Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/hotels/${hotelId}`)

  if(!response.ok) {
    throw new Error('Error fetching hotel')
  }

  return response.json()
}