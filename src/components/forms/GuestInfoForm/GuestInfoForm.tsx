import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSearchContext } from "../../../contexts/SearchContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

const bookingFormSchema = z.object({
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
  adultCount: z.coerce
    .number()
    .min(1, { message: "Please enter a valid adultCount number" }),
  childCount: z.coerce
    .number()
    .min(0, { message: "Please enter a valid childCount number" }),
});

type bookingFormSchema = z.infer<typeof bookingFormSchema>;

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const appContext = useContext(AppContext);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<bookingFormSchema>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handleBookingSubmit = (bookingFormData: bookingFormSchema) => {
    search.setSearchContext(
      search.destination,
      bookingFormData.checkIn,
      bookingFormData.checkOut,
      bookingFormData.adultCount,
      bookingFormData.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  const onSignInClick = (bookingFormData: bookingFormSchema) => {
    search.setSearchContext(
      search.destination,
      bookingFormData.checkIn,
      bookingFormData.checkOut,
      bookingFormData.adultCount,
      bookingFormData.childCount
    );
    navigate("/sign-in", { state: { from: location } });
  };
  return (
    <div className="flex flex-col p-4 bg-blue-300 gap-4">
      <h3 className="text-md font-bold">${pricePerNight} per night</h3>
      <form
        onSubmit={handleSubmit(
          appContext?.isAuthenticated ? handleBookingSubmit : onSignInClick
        )}
      >
        <div className="grid grid-cols-1 gap-4 items-center">
          <div>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check In date"
              className="w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
            {errors.checkIn && (
              <span className="text-red-500">{errors.checkIn.message}</span>
            )}
          </div>
          <div>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minDate}
              maxDate={maxDate}
              placeholderText="Check In date"
              className="w-full bg-white p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
            {errors.checkOut && (
              <span className="text-red-500">{errors.checkOut.message}</span>
            )}
          </div>

          <div className="bg-white flex px-2 py-1 gap-2">
            <label className="flex items-center">
              Adults
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={30}
                {...register("adultCount")}
              />
              {errors.adultCount && (
                <span className="text-red-500">
                  {errors.adultCount.message}
                </span>
              )}
            </label>
            <label className="flex items-center">
              Children
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={30}
                {...register("childCount")}
              />
              {errors.childCount && (
                <span className="text-red-500">
                  {errors.childCount.message}
                </span>
              )}
            </label>
          </div>
          {appContext?.isAuthenticated ? (
            <button className="bg-blue-600 h-full text-white p-2 font-bold hover:blue-blue-500 text-xl">
              Book now
            </button>
          ) : (
            <button className="bg-blue-600 h-full text-white p-2 font-bold hover:blue-blue-500 text-xl">
              Sign in to book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
