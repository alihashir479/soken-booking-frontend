export type BookingType = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  totalCost: number;
}

export type HotelType = {
  _id: string;
  userId: string;  
  name: string;  
  city: string;  
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageUrls: string[];
  lastUpdated: string;
  bookings: BookingType[]
}

export type User = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}