import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../api/UserApi";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["SignOut"],
    mutationFn: logoutUser,
    onSuccess: async () => {
      appContext?.showToast({
        message: "Logged out successfully!",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries({ queryKey: ["authenticate"] });
      navigate("/sign-in");
    },
    onError: (error: Error) => {
      appContext?.showToast({ message: error.message, type: "ERROR" });
    },
  });
  const logout = async () => {
    await mutation.mutateAsync();
  };
  return (
    <button
      className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100"
      onClick={logout}
    >
      Sign Out
    </button>
  );
};
export default SignOutButton;
