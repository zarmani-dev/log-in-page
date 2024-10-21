import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import { Button } from "./ui/button";
import useCookie from "react-use-cookie";

interface Inputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const [, setUserToken] = useCookie("token");

  const handleFormSubmit = async (data: Inputs) => {
    const name: string = `${data.firstName} ${data.lastName}`;

    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      body: JSON.stringify({
        name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const json = await response.json();

    if (response.status == 200) {
      setUserToken(json.token);
      toast.success("Account created successfully");
      navigate("/");
    } else {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  };

  return (
    <div className="p-3 md:p-10">
      <h3 className="text-sm uppercase font-bold text-zinc-500 mb-4">
        Start from free
      </h3>
      <h1 className="text-zinc-300 text-3xl ">Create your account</h1>
      <div className="flex gap-3 text-zinc-400/80 font-medium">
        <p>Already have an account?</p>{" "}
        <Link to="/" className="text-[#FF5B31] ">
          Log in
        </Link>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="mt-3">
        <div className="flex flex-col md:flex-row justify-between gap-3 ">
          <InputBox
            id="firstName"
            label="First Name"
            type="text"
            placeholder="John"
            register={register}
            error={errors.firstName?.message}
            validation={{ required: "First Name is required" }}
          />
          <InputBox
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
            register={register}
            error={errors.lastName?.message}
            validation={{ required: "Last Name is required" }}
          />
        </div>
        <InputBox
          id="email"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
          register={register}
          error={errors.email?.message}
          validation={{ required: "Email is required" }}
        />
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <InputBox
            id="password"
            label="Password"
            type="password"
            placeholder="********"
            register={register}
            error={errors.password?.message}
            validation={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            }}
          />
          <InputBox
            id="password_confirmation"
            label="Confirm Password"
            type="password"
            placeholder="********"
            register={register}
            error={errors.password?.message}
            validation={{
              required: "Confirm Password is required",
              validate: (value: string) =>
                value === watch("password") || "Passwords do not match",
            }}
          />
        </div>
        <Button className="bg-[#FF5B31] hover:bg-orange-700">
          Create account
        </Button>
      </form>
    </div>
  );
};
export default RegisterForm;
