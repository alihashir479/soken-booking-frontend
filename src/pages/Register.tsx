import { registerUser } from "../api/UserApi";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useMutation } from "@tanstack/react-query";
import UserRegistration, {
  userRegistrationType,
} from "../components/forms/UserRegistration";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const naviagte = useNavigate()
  const appContext = useContext(AppContext);
  const mutation = useMutation({
    mutationFn: registerUser,
    mutationKey: ["registerUser"],
    onError: (error) => {
      appContext?.showToast({ message: error.message, type: "ERROR" });
    },
    onSuccess: () => {
      appContext?.showToast({
        message: "Successfully registered user",
        type: "SUCCESS",
      });
      naviagte('/')
    },
  });

  const handleUserRegistraion = async (user: userRegistrationType) => {
    try {
      setIsLoading(true);
      await mutation.mutateAsync(user);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserRegistration
      isLoading={isLoading}
      handleUserRegistraion={handleUserRegistraion}
    />
  );
};

export default Register;
