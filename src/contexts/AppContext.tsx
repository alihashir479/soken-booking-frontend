import { createContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "@tanstack/react-query";
import { isLoggedIn } from "../api/Auth";
import { loadStripe, Stripe } from "@stripe/stripe-js";

const stripePromise = await loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY)

type Props = {
  children: React.ReactNode;
};

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toast: ToastMessage) => void,
  isAuthenticated: boolean;
  stripePromise: Stripe | Promise<Stripe | null> | null
}

export const AppContext = createContext<AppContext | undefined>(undefined);

const AppContextProvider = ({ children }: Props) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  const {isError} = useQuery({
    queryKey: ['authenticate'],
    queryFn: isLoggedIn,
    retry: false
  })
  
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage: ToastMessage) => setToast(toastMessage),
        isAuthenticated: !isError,
        stripePromise
      }}
    >
      {toast && (
        <Toast
          message={toast?.message}
          type={toast?.type}
          onClose={() => {
            setToast(undefined);
          }}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
