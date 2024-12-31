import { loginUser } from "../api/UserApi";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SignInForm, { loginFormType } from "../components/forms/SignIn";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const naviagte = useNavigate();
  const appContext = useContext(AppContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: loginUser,
    mutationKey: ["loginUser"],
    onError: (error: Error) => {
      appContext?.showToast({ message: error.message, type: "ERROR" });
    },
    onSuccess: async () => {
      appContext?.showToast({
        message: "Logged in successfully!",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries({ queryKey: ["authenticate"] });
      naviagte("/");
    },
  });

  const handleUserLogin = async (user: loginFormType) => {
    try {
      setIsLoading(true);
      await mutation.mutateAsync(user);
    } finally {
      setIsLoading(false);
    }
  };

  return <SignInForm isLoading={isLoading} handleUserLogin={handleUserLogin} />;
};
export default SignIn;
