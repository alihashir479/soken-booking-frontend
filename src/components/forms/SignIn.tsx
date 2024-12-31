import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../LoadingButton";
import { Link } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password should be atleast 8 characters" })
    .max(12, { message: "Password should be atmost 12 characters" }),
});

export type loginFormType = z.infer<typeof formSchema>;

type Props = {
  isLoading: boolean;
  handleUserLogin: (user: loginFormType) => void;
};
const UserRegistration = ({ isLoading, handleUserLogin }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormType>({
    resolver: zodResolver(formSchema),
  });
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleUserLogin)}
    >
      <h1 className="text-3xl font-bold">Sign In</h1>
      <label className="text-gray-700 font-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 font-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      {isLoading ? (
        <LoadingButton />
      ) : (
        <span className="flex items-center justify-between">
          <span>
            Not a user?{" "}
            <Link className="underline" to="/register">
              Create a account here
            </Link>
          </span>
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 px-5"
          >
            Sign In
          </button>
        </span>
      )}
    </form>
  );
};

export default UserRegistration;
