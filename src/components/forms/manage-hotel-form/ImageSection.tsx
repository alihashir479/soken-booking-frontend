import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();
  const existingImageUrls = watch("imageUrls");

  const handleDeleteImage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    url: string
  ) => {
    event.preventDefault()
    setValue(
      "imageUrls",
      existingImageUrls.filter((imageUrl) => imageUrl !== url)
    );
  };

  return (
    <div>
      <h2 className="texr-2xl font-bold mb-3">Image</h2>
      {existingImageUrls && (
        <div className="grid grid-cols-6 gap-4">
          {existingImageUrls.map((image, idx) => (
            <div className="relative group" key={idx}>
              <img src={image} className="min-h-full object-cover" />
              <button
                className="absolute flex items-center justify-center inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100"
                onClick={(event) => handleDeleteImage(event, image)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles")}
        />
        {errors.imageFiles && (
          <span className="text-red-500">{errors.imageFiles.message}</span>
        )}
      </div>
    </div>
  );
};

export default ImageSection;
