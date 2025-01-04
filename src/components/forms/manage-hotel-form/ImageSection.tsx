import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
   const {register, formState: {errors}} = useFormContext<HotelFormData>() 
  return (
    <div>
      <h2 className="texr-2xl font-bold mb-3">Image</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input type="file" multiple accept="image/*"className="w-full text-gray-700 font-normal" {...register('imageFiles')} />
        {errors.imageFiles && <span className="text-red-500">{errors.imageFiles.message}</span>}
      </div>
    </div>
  );
};

export default ImageSection;
