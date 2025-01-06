import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchHotelById, updateHotel } from "../api/Hotel";
import ManageHotelForm from "../components/forms/manage-hotel-form/ManageHotelForm";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const appContext = useContext(AppContext)
  const { id } = useParams();

  if (!id) {
    return;
  }

  const { data: hotelData, isPending } = useQuery({
    enabled: !!id,
    queryKey: ["editHotel"],
    queryFn: async () => {
      const data = await fetchHotelById(id);
      return data;
    },
  });

  const mutation = useMutation({
    mutationFn: updateHotel,
    mutationKey: ["registerHotel"],
    onError: (error: Error) => {
      appContext?.showToast({ message: error.message, type: "ERROR" });
    },
    onSuccess: async () => {
      appContext?.showToast({
        message: "Hotel updated successfully",
        type: "SUCCESS",
      });
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!hotelData) {
    return <div>Error fetching Hotel</div>;
  }

  const handleSave = async (hotelFormData: FormData) => {
    console.log('called')
    try {
      setIsLoading(true);
      await mutation.mutateAsync({id: id, hotelData: hotelFormData});
    } finally {
      setIsLoading(false);
    }
  };

  return <ManageHotelForm handleSave={handleSave} isLoading={isLoading} hotelData={hotelData} />;
};

export default EditHotel;
