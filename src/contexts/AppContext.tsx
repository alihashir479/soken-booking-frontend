import { createContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "@tanstack/react-query";
import { isLoggedIn } from "../api/Auth";

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
        isAuthenticated: !isError
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
