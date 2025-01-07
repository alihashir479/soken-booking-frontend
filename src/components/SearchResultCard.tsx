import { Star } from "lucide-react";
import { HotelType } from "../types/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};
const SearchResultCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div className="grid grid-rows grid-rows-[1fr_2fr_1fr]">
          <div>
            <div className="flex items-center">
              {Array(hotel.starRating)
                .fill(null)
                .map((_, idx) => (
                  <Star className="text-yellow-500 fill-yellow-500" key={idx} />
                ))}
              <span className="ml-1 text-sm">{hotel.type}</span>
            </div>
            <Link
              to={`/detail/${hotel._id}`}
              className="text-2xl font-bold cursor-pointer"
            >
              {hotel.name}
            </Link>
          </div>
          <div className="line-clamp-4 max-h-fit">{hotel.description}</div>

          <div className="grid grid-cols-2 whitespace-nowrap items-end">
            <div className="flex gap-1 items-center">
              {hotel.facilities.slice(0, 3).map((facility) => (
                <span
                  className="bg-slate-300 p-2 rounded-lg font-bold text-xs"
                  key={facility}
                >
                  {facility}
                </span>
              ))}
              {hotel.facilities.length > 3 && (
                <span className="text-sm">
                  {" "}
                  + {hotel.facilities.length - 3} more
                </span>
              )}
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="font-bold">
                ${hotel.pricePerNight} per night
              </span>
              <Link
                to={`/detail/${hotel._id}`}
                className="bg-blue-600 text-white h-full p-2 text-bold text-xl max-w-fit hover:bg-blue-500"
              >
                View more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchResultCard;
