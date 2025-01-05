import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchUserHotels } from "../api/Hotel";
import { HotelType } from "../types/types";
import { Building, Currency, Hotel, Map, Star } from "lucide-react";

const MyHotels = () => {
  const { data: hotelData, isPending } = useQuery({
    queryKey: ["fetchHotels"],
    queryFn: fetchUserHotels,
  });

  if (isPending) {
    return <div>Fetching Hotels...</div>;
  }

  if (!hotelData) {
    return <div>No Hotels found</div>;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white font-bold p-2 hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel: HotelType) => (
          <div
            className="flex flex-col border border-slate-300 rounded-lg gap-5 p-8"
            key={hotel._id}
          >
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm flex items-center p-2">
                <Map className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm flex items-center p-2">
                <Building className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm flex items-center p-2">
                <Currency className="mr-1" />${hotel.pricePerNight} per night
              </div>
              <div className="border border-slate-300 rounded-sm flex items-center p-2">
                <Hotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm flex items-center p-2">
                <Star className="mr-1" />
                {hotel.starRating} rating
              </div>
            </div>
            <span className="flex justify-end">
              <Link
                className="flex bg-blue-600 text-white font-bold p-2 hover:bg-blue-500"
                to={`/edit-hotel/${hotel._id}`}
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MyHotels;
