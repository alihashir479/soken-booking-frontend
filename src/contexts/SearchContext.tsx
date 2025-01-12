import React, { useContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  setSearchContext: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number
  ) => void;
};

const SearchContextProvider = React.createContext<SearchContext | undefined>(
  undefined
);

const getSessionData = () => {
  const data = sessionStorage.getItem('searchHotelState') as string
  return data ? JSON.parse(data) : undefined
}

export const SearchContext = ({ children }: Props) => {
  const sessionData:SearchContext | undefined = getSessionData()

  const [destination, setDestination] = useState<string>(sessionData?.destination || '')
  const [checkIn, setCheckIn] = useState<Date>(sessionData?.checkIn ? new Date(sessionData.checkIn) : new Date())
  const [checkOut, setCheckOut] = useState<Date>(sessionData?.checkOut ? new Date(sessionData.checkOut) : new Date())
  const [adultCount, setAdultCount] = useState<number>(sessionData?.adultCount || 1)
  const [childCount, setChildCount] = useState<number>(sessionData?.childCount || 0)

  const setSearchContext = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
  ) => {
    setDestination(destination)
    setCheckIn(checkIn)
    setCheckOut(checkOut)
    setAdultCount(adultCount)
    setChildCount(childCount)

    sessionStorage.setItem('searchHotelState', JSON.stringify({
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    }))
  }


  return <SearchContextProvider.Provider value={{
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    setSearchContext
  }}>{children}</SearchContextProvider.Provider>;
};

export const useSearchContext = () => {
  const context = useContext(SearchContextProvider)
  return context as SearchContext
}