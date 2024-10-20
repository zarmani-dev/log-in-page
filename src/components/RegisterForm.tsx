import { Link } from "react-router-dom";
import InputBox from "./InputBox";
import { Button } from "./ui/button";

const RegisterForm = () => {
  return (
    <div className="p-3 md:p-10">
      <h3 className="text-sm uppercase font-bold text-zinc-500 mb-4">
        Start from free
      </h3>
      <h1 className="text-zinc-300 text-3xl ">Create your account</h1>
      <div className="flex gap-3 text-zinc-400/80 font-medium">
        <p>Already a member?</p>{" "}
        <Link to="/login" className="text-[#FF5B31] ">
          Log in
        </Link>
      </div>
      <form className="mt-3">
        <div className="flex flex-col md:flex-row justify-between gap-3 ">
          <InputBox
            id="firstName"
            label="First Name"
            type="text"
            placeholder="John"
          />
          <InputBox
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Doe"
          />
        </div>
        <InputBox
          id="email"
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
        />
        <div className="flex flex-col md:flex-row justify-between gap-3">
          <InputBox
            id="password"
            label="Password"
            type="password"
            placeholder="********"
          />
          <InputBox
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="********"
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
