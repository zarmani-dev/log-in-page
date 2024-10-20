import { Link, useNavigate } from "react-router-dom";
import InputBox from "./InputBox";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import useCookie from "react-use-cookie";

interface Inputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const [userCookie, setUserCookie] = useCookie("user");
  const [userToken, setUserToken] = useCookie("token");

  const handleLogin = async (data: Inputs) => {
    console.log(data);

    const res = await fetch(import.meta.env.VITE_API_URL + "/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const json = await res.json();

    if (res.status === 200) {
      toast.success("Login Successfully");
      setUserToken(json.token);
      setUserCookie(JSON.stringify(json.user));
      navigate("/home");
    } else {
      toast.error(json.message);
    }
  };

  return (
    <div className="p-3 md:p-10">
      <h3 className="text-sm uppercase font-bold text-zinc-500 mb-4">
        Explore Your Journey
      </h3>
      <h1 className="text-zinc-300 text-3xl ">Log In To Your Account</h1>
      <div className="flex gap-3 text-zinc-400/80 font-medium">
        <p>Don't have an account?</p>{" "}
        <Link to="/register" className="text-[#FF5B31] ">
          Sign Up
        </Link>
      </div>
      <form onSubmit={handleSubmit(handleLogin)} className="mt-3">
        <InputBox
          id="email"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
          register={register}
          error={errors.email?.message}
          validation={{ required: "Email is required" }}
        />
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
        <Button className="bg-[#FF5B31] hover:bg-orange-700">Log In</Button>
      </form>
    </div>
  );
};
export default LoginForm;
