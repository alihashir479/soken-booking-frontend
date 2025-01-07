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

export const SearchContext = ({ children }: Props) => {
  const [destination, setDestination] = useState<string>('')
  const [checkIn, setCheckIn] = useState<Date>(new Date())
  const [checkOut, setCheckOut] = useState<Date>(new Date())
  const [adultCount, setAdultCount] = useState<number>(1)
  const [childCount, setChildCount] = useState<number>(1)

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