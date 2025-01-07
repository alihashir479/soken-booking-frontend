import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { Plane } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  onSearch: () => void;  
}

const SearchBar = ({onSearch}: Props) => {
  const search = useSearchContext();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    search.setSearchContext(destination, checkIn, checkOut, adultCount, childCount)
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit} className="-mt-16 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
      <div className="flex items-center flex-1 bg-white p-2">
        <Plane className="mr-2" />
        <input
          type="text"
          className="w-full focus:outline-none"
          placeholder="Where are you going?"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="bg-white flex px-2 py-1 gap-2">
        <label className="flex items-center">
          Adults
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={30}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="flex items-center">
          Children
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={30}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>

      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check In date"
          className="w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check In date"
          className="w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex gap-1">
        <button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500" type="submit">
          Search
        </button>
        <button className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
};
export default SearchBar;
