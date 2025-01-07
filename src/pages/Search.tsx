import { useQuery } from "@tanstack/react-query";
import { useSearchContext } from "../contexts/SearchContext";
import { fetchAllHotels } from "../api/Hotel";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { HotelType } from "../types/types";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/MaxPriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1);
  const [selctedStarRatings, setSelctedStarRatings] = useState<string[]>([])
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([])
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([])
  const [selectedPrice, setSelectedPrice] = useState<number>()
  const [sortOptions, setSortOption] = useState<string>('')

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkIn.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selctedStarRatings,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    price: selectedPrice?.toString(),
    sortOptions
  };
  const { data: hotelData, isPending } = useQuery({
    queryKey: ["searchHotels", searchParams],
    queryFn: async () => {
      const data = await fetchAllHotels(searchParams);
      return data;
    },
  });

  if (isPending) {
    return <span>Loading Hotels...</span>
  }

  if(!hotelData) {
    return <span>No hotels found</span>
  }

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value
    setSelctedStarRatings((prev) => (
      event.target.checked ? [...prev, starRating] : prev.filter((star) => star != starRating)
    ))
  }

  const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value
    setSelectedHotelTypes((prev) => (
      event.target.checked ? [...prev, hotelType] : prev.filter((type) => type != hotelType)
    ))
  }

  const handleHotelFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelFacility = event.target.value
    setSelectedFacilities((prev) => (
      event.target.checked ? [...prev, hotelFacility] : prev.filter((type) => type != hotelFacility)
    ))
  }


  const onSearch = () => {};
  return (
    <>
      <SearchBar onSearch={onSearch} />
      <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 mt-6">
        <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10 bg-white">
          <div className="space-y-5">
            <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
              Filter by:
            </h3>
            <StarRatingFilter selectedStars={selctedStarRatings} onChange={handleRatingChange} />
            <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange} />
            <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleHotelFacilityChange} />
            <PriceFilter selectedPrice={selectedPrice} onChange={(price: number) => setSelectedPrice(price)} />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold">
              {hotelData?.pagination.total} hotels found{" "}
              {search.destination ? ` in ${search.destination}` : ""}
            </span>

            <select className="p-2 border rounded-md" value={sortOptions} onChange={(event) => setSortOption(event.target.value)}>
              <option value=''>Sort By</option>
              <option value='starrating'>Star rating</option>
              <option value='pricePerNightAsc'>Price per night(low to high)</option>
              <option value='pricePerNightDsc'>Price per night(high to low)</option>

            </select>
          </div>
          {hotelData?.data.map((hotel: HotelType) => (
            <SearchResultCard hotel={hotel} key={hotel._id} />
          ))}
          <Pagination currentPage={page} pages={hotelData?.pagination.pages} onPageChange={(page) => setPage(page)} />
        </div>
      </div>
    </>
  );
};
export default Search;
