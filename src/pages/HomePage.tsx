import Navbar from "@/components/NavBar";
import imageOne from "../assets/img/img1.jpg";
import imageTwo from "../assets/img/img2.jpg";

import useUserStore from "@/store/useUserStore";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import useCookie from "react-use-cookie";

const HomePage = () => {
  const [userToken] = useCookie("token");
  const [userCookie] = useCookie("user");
  const { setUser } = useUserStore();

  useEffect(() => {
    setUser(JSON.parse(userCookie));
  }, []);

  if (!userToken) {
    return <Navigate to="/" />;
  }

  return (
    <main className=" w-[90%] mt-10 lg:w-[70%] mx-auto p-3 bg-zinc-900 rounded-lg">
      <div className="mb-10">
        <Navbar />
        <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
          <img
            className="mt-10 w-[300px] rounded-lg"
            src={imageOne}
            alt="Fish"
          />
          <img
            className="mt-10 w-[300px] rounded-lg"
            src={imageTwo}
            alt="Moon"
          />
        </div>
      </div>
    </main>
  );
};
export default HomePage;
