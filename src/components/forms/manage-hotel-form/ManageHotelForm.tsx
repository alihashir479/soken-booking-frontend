import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import LoadingButton from "../../LoadingButton";
import { HotelType } from "../../../types/types";
import { useEffect } from "react";

type Props = {
  handleSave: (formData: FormData) => void;
  isLoading: boolean;
  hotelData?: HotelType;
};

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: FileList;
  imageUrls: string[];
};

const HoterFormSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    city: z.string().min(1, { message: "City is required" }),
    country: z.string().min(1, { message: "Country is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    type: z.string().min(1, { message: "Type is required" }),
    adultCount: z.coerce
      .number()
      .min(1, { message: "Min 1 member is required" }),
    childCount: z.coerce
      .number()
      .min(0, { message: "Min 0 member is required" }),
    facilities: z
      .string()
      .array()
      .min(1, { message: "Min 1 facility is required" }),
    pricePerNight: z.coerce
      .number()
      .min(1, { message: "Price cannot be null and cannot be negtive or 0" }),
    starRating: z.coerce
      .number()
      .min(1, {
        message: "Star rating cannot be null and cannot be less than 1",
      })
      .max(5, { message: "Cannot be more than 5" }),
    imageUrls: z.string().array().optional(),
    imageFiles: z.instanceof(FileList).optional()
  }).refine((data) => (data.imageFiles?.length || 0) + (data.imageUrls?.length || 0) > 0, {
    path: ['imageFiles'],
    message: 'At least one image is required'
  })
  .refine((data) => (data.imageFiles?.length || 0) + (data.imageUrls?.length || 0) < 7, {
    path: ['imageFiles'],
    message: 'Maximum of 6 images are allowed'
  })
const ManageHotelForm = ({ handleSave, isLoading, hotelData }: Props) => {
  const formMethods = useForm<HotelFormData>({
    resolver: zodResolver(HoterFormSchema),
    defaultValues: {
      facilities: [],
      type: "",
      adultCount: 1,
      childCount: 0,
    },
  });

  const handleFormSubmit = (hotelFormDataJson: HotelFormData) => {
    console.log(hotelFormDataJson);
    const formData = new FormData();
    formData.append("name", hotelFormDataJson.name);
    formData.append("city", hotelFormDataJson.city);
    formData.append("country", hotelFormDataJson.country);
    formData.append("description", hotelFormDataJson.description);
    formData.append("type", hotelFormDataJson.type);
    formData.append("adultCount", hotelFormDataJson.adultCount.toString());
    formData.append("childCount", hotelFormDataJson.childCount.toString());
    formData.append(
      "pricePerNight",
      hotelFormDataJson.pricePerNight.toString()
    );
    formData.append("starRating", hotelFormDataJson.starRating.toString());

    hotelFormDataJson.facilities.forEach((facility, idx) => {
      formData.append(`facilities[${idx}]`, facility);
    });
    console.log(hotelFormDataJson.imageUrls)

    if (hotelFormDataJson.imageUrls && hotelFormDataJson.imageUrls.length > 0) {
      hotelFormDataJson.imageUrls.forEach((imageUrl, idx) => {
        formData.append(`imageUrls[${idx}]`, imageUrl);
      });
    }

    Array.from(hotelFormDataJson.imageFiles).forEach((imageFile) => {
      formData.append("imageFiles", imageFile);
    });

    handleSave(formData);
  };

  useEffect(() => {
    if (hotelData) {
      formMethods.reset(hotelData);
    }
  }, [hotelData]);

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(handleFormSubmit)}
        className="flex flex-col gap-10"
      >
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
        <ImageSection />
        <span className="flex justify-end">
          {isLoading ? (
            <LoadingButton />
          ) : (
            <button
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
              type="submit"
            >
              {hotelData ? 'Update Hotel' : 'Add Hotel'}
            </button>
          )}
        </span>
      </form>
    </FormProvider>
  );
};
export default ManageHotelForm;
