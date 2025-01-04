import { useMutation } from "@tanstack/react-query";
import { registerHotel } from "../api/Hotel";
import ManageHotelForm from "../components/forms/manage-hotel-form/ManageHotelForm";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

const AddHotel = () => {
  const appContext = useContext(AppContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: registerHotel,
    mutationKey: ["registerHotel"],
    onError: (error: Error) => {
      appContext?.showToast({ message: error.message, type: "ERROR" });
    },
    onSuccess: async () => {
      appContext?.showToast({
        message: "Hotel created successfully",
        type: "SUCCESS",
      });
    },
  });

  const handleSave = async (hotelFormData: FormData) => {
    try {
      setIsLoading(true);
      await mutation.mutateAsync(hotelFormData);
    } finally {
      setIsLoading(false);
    }
  };
  return <ManageHotelForm handleSave={handleSave} isLoading={isLoading} />;
};
export default AddHotel;
