import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useCookie from "react-use-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import useUserStore from "@/store/useUserStore";

interface Inputs {
  username: string;
}

const ProfileForm = () => {
  const [disabled, setDisabled] = useState(true);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  const { setUser } = useUserStore();

  const [userCookie, setUserCookie] = useCookie("user");
  const [userToken] = useCookie("token");
  const userData = JSON.parse(userCookie);

  const onEdit = () => {
    setDisabled(false);
  };

  const onUpdateName = async (data: Inputs) => {
    console.log(data);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/user-profile/change-name`,
      {
        method: "POST",
        body: JSON.stringify({ name: data.username }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    const json = await res.json();

    if (res.status === 200) {
      toast.success(json.message);
      setUserCookie(JSON.stringify(json.user));
      setUser(json.user);
      setDisabled(true);
      reset();
    } else {
      toast.error(json.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onUpdateName)} className="space-y-4 py-4">
      <Avatar className="size-20">
        <AvatarImage src={userData.image} alt="Profile" />
        <AvatarFallback>
          {" "}
          {userData.name.split(" ")[0][0].toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="space-y-2">
        <Label htmlFor="name">Username</Label>
        <div className="flex justify-between gap-2">
          <Input
            id="username"
            {...register("username")}
            defaultValue={userData.name}
            disabled={disabled}
            className="disabled:cursor-default disabled:opacity-100"
          />
          <Button onClick={onEdit} type="button" variant="outline" size="icon">
            <Pencil />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="flex justify-between gap-2">
          <Input
            id="email"
            defaultValue={userData.email}
            type="email"
            disabled
            className="disabled:cursor-default disabled:opacity-100"
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Save changes
      </Button>
    </form>
  );
};
export default ProfileForm;
