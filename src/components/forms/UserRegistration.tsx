import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingButton from "../LoadingButton";
import { Link } from "react-router-dom";

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First Name is required!" }),
    lastName: z.string().min(1, { message: "Last Name is required!" }),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password should be atleast 8 characters" })
      .max(12, { message: "Password should be atmost 12 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password should be atleast 8 characters" })
      .max(12, { message: "Password should be atmost 12 characters" }),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type userRegistrationType = z.infer<typeof formSchema>;

type Props = {
  isLoading: boolean;
  handleUserRegistraion: (user: userRegistrationType) => void;
};
const UserRegistration = ({ isLoading, handleUserRegistraion }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userRegistrationType>({
    resolver: zodResolver(formSchema),
  });
  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(handleUserRegistraion)}
    >
      <h1 className="text-3xl font-bold">Create an account</h1>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 font-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName")}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 font-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName")}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 font-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      {isLoading ? (
        <LoadingButton />
      ) : (
        <span className="flex justify-between items-center">
          <span>Already a user? <Link className="underline" to="/sign-in">Login</Link></span>
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 px-5"
        >
          Create an account
        </button>
        </span>
      )}
    </form>
  );
};

export default UserRegistration;
