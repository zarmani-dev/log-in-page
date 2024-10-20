import LoginForm from "@/components/LoginForm";
import loginImg from "../assets/img/login.jpg";

const LoginPage = () => {
  return (
    <main className="absolute top-3 md:top-1/2 left-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-[90%] lg:w-[70%] mx-auto p-3 bg-zinc-900 rounded-lg">
      <section className="flex flex-col md:flex-row justify-between">
        <div className="hidden md:block md:w-1/2">
          <img
            className="rounded-lg h-full object-cover object-right"
            src={loginImg}
            alt="Toypiration Image"
          />
        </div>
        <div className="w-full md:w-1/2">
          <LoginForm />
        </div>
      </section>
    </main>
  );
};
export default LoginPage;
