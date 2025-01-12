import { z } from "zod";
import { User } from "../../../types/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createHotelBooking, PaymentIntentResponse } from "../../../api/Hotel";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSearchContext } from "../../../contexts/SearchContext";
import { StripeCardElement } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../../contexts/AppContext";

type Props = {
  currentUser: User;
  paymentIntent: PaymentIntentResponse;
};

const bookingFormSchema = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }),
  lastName: z.string().min(1, { message: "First Name is required" }),
  email: z.string().min(1, { message: "First Name is required" }),
  adultCount: z.coerce.number(),
  childCount: z.coerce.number(),
  checkIn: z.string(),
  checkOut: z.string(),
  totalCost: z.coerce.number(),
  paymentIntentId: z.string(),
});

export type bookingFormSchema = z.infer<typeof bookingFormSchema>;
const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const appContext = useContext(AppContext);
  const { hotelId } = useParams();
  const stripe = useStripe();
  const elements = useElements();

  const searchContext = useSearchContext();

  const mutation = useMutation({
    mutationKey: ["createBooking"],
    mutationFn: createHotelBooking,
    onError: (error: Error) => {
      appContext?.showToast({ message: error.message, type: "ERROR" });
    },
    onSuccess: async () => {
      appContext?.showToast({
        message: "Booking created successfully",
        type: "SUCCESS",
      });
    },
  });

  const { handleSubmit, register } = useForm<bookingFormSchema>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: searchContext.adultCount,
      childCount: searchContext.childCount,
      checkIn: searchContext.checkIn.toISOString(),
      checkOut: searchContext.checkOut.toISOString(),
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const confirmPayment = async (data: bookingFormSchema) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe?.confirmCardPayment(
      paymentIntent.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
        },
      }
    );

    console.log(result);

    if (result?.paymentIntent?.status == "succeeded") {
      try {
        mutation.mutateAsync({hotelId: hotelId || '', data})
      }
      finally {

      }
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-5 rounded border border-slate-300 p-5"
      onSubmit={handleSubmit(confirmPayment)}
    >
      <span className="text-3xl font-bold">Confirm your booking</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 w-full border rounded px-3 py-2 text-gray-700 bg-gray-200"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 w-full border rounded px-3 py-2 text-gray-700 bg-gray-200"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 w-full border rounded px-3 py-2 text-gray-700 bg-gray-200"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price summary</h2>
      </div>
      <div className="bg-blue-300 p-4 rounded-md">
        <div className="font-semibold text-lg">
          Total cost ${paymentIntent.totalCost.toFixed(2)}
        </div>
        <div className="text-xs">Includes tax and charges</div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-smeibold">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 font-bold hover:bg-blue-500 text-md"
        >
          Confirm Booking
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
