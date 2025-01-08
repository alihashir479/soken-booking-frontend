import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchHotel } from "../api/Hotel";
import { Star } from "lucide-react";
import GuestInfoForm from "../components/forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { hotelId } = useParams();
  const { data: hotelData, isPending } = useQuery({
    queryKey: ["hotelId", hotelId],
    queryFn: () => fetchHotel(hotelId || ""),
    enabled: !!hotelId,
  });

  if (isPending) {
    return <div>Fetching hotel...</div>;
  }

  if (!hotelData) {
    return <></>;
  }

  return (
    <div className="space-y-6 ">
      <div>
        <span className="flex">
          {Array.from({ length: hotelData.starRating || 0 }).map((_, idx) => (
            <Star className="text-yellow-500 fill-yellow-500" key={idx} />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotelData.name}</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hotelData.imageUrls.map((imageUrl, idx) => (
          <div className="h-[300px]" key={idx}>
            <img
              src={imageUrl}
              alt={hotelData.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 grid-cols-4 gap-2">
         {hotelData.facilities.map((facility) => (
            <div className="border border-slate-300 rounded-sm p-3">{facility}</div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
         <div className="whitespace-pre-line">
            {hotelData.description}
         </div>
         <div className="h-fit"><GuestInfoForm hotelId={hotelData._id} pricePerNight={hotelData.pricePerNight} /></div>
      </div>
    </div>
  );
};
export default Detail;
