import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";
const FacilitiesSection = () => {
  const {
    register,
    formState: {errors}
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((facility) => (
          <label className="text-sm flex gap-1 text-gray-700" key={facility}>
            <input
              type="checkbox"
              value={facility}
              {...register("facilities")}
            />
            {facility}
          </label>
        ))}
        {errors.facilities && (
          <span className="text-red-500">{errors.facilities.message}</span>
        )}
      </div>
    </div>
  );
};
export default FacilitiesSection;
