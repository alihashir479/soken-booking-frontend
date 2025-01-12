import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../api/UserApi";
import BookingForm from "../components/forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { createPaymentIntent, fetchHotel } from "../api/Hotel";
import { useContext, useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";
import { AppContext } from "../contexts/AppContext";

const Booking = () => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: hotel, isPending: isHotelLoading } = useQuery({
    queryKey: ["fetchHotel"],
    queryFn: () => fetchHotel(hotelId || ""),
    enabled: !!hotelId,
  });

  const { data: currentUser, isPending: isUserLoading } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: fetchCurrentUser,
  });

  const { data: paymentIntentData, isPending: isPaymentIntentLoading } =
    useQuery({
      queryKey: ["createPaymentIntent"],
      queryFn: () =>
        createPaymentIntent(hotelId || "", numberOfNights.toString()),
      enabled: !!hotelId && numberOfNights > 0,
    });

  if (isHotelLoading || isUserLoading || isPaymentIntentLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>Unable to fetch user</div>;
  }

  if (!hotel) {
    return <div>Unable to fetch hotel</div>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {appContext?.stripePromise && paymentIntentData && (
        <Elements stripe={appContext?.stripePromise} options={{clientSecret: paymentIntentData?.clientSecret}}>
          <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData} />
        </Elements>
      )}
    </div>
  );
};
export default Booking;
