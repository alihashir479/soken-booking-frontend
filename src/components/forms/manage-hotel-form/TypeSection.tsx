import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";
const TypeSection = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
        <div className="grid grid-cols-5 gap-4">
          {hotelTypes.map((type, idx) => (
            <label
              key={idx}
              className={
                typeWatch == type
                  ? "cursor-pointer bg-blue-300 text-sm px-4 py-2 rounded-full font-semibold"
                  : "cursor-pointer bg-gray-300 text-sm px-4 py-2 rounded-full font-semibold"
              }
            >
              <input
                type="radio"
                className="hidden"
                {...register("type")}
                value={type}
              />
              <span className="ml-2">{type}</span>
            </label>
          ))}
        </div>
        {errors.type && (
          <span className="text-red-500">{errors.type.message}</span>
        )}
    </div>
  );
};
export default TypeSection;
