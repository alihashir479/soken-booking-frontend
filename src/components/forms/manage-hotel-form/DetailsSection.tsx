import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-4">Add Hotel</h1>
      <label className="text-gray-700 font-sm font-bold flex-1">
        Name
        <input
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name")}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>
      <div className="flex gap-4">
        <label className="text-gray-700 font-sm font-bold flex-1">
          City
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city")}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label className="text-gray-700 font-sm font-bold flex-1">
          Country
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country")}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>
      <label className="text-gray-700 font-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description")}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>
      <label className="text-gray-700 font-sm font-bold max-w-[50%]">
        Price per night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight")}
        />
        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>
      <label className="text-gray-700 font-sm font-bold max-w-[50%]">
        Star rating
        <select
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("starRating")}
        >
          <option value=''>Select as rating</option>
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};
export default DetailsSection;
