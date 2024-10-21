import { Asterisk, AsteriskIcon, Menu, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";

import useUserStore from "@/store/useUserStore";
import { useState } from "react";
import { removeCookie } from "react-use-cookie";
import ProfileForm from "./ProfileForm";

export default function Navbar() {
  return (
    <nav className="border-b ">
      <div className="flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6 text-white hover:text-black" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link to="/" className="block px-2 py-1 text-lg">
                Home
              </Link>
              <Link to="/about" className="block px-2 py-1 text-lg">
                About
              </Link>
              <Link to="/contact" className="block px-2 py-1 text-lg">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </nav>
  );
}

function UserNav() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user } = useUserStore();

  console.log(user);

  const navigate = useNavigate();

  const onLogOut = () => {
    removeCookie("token");
    removeCookie("user");
    navigate("/");
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.profile_image} alt="Profile" />
              <AvatarFallback>{user.name.split(" ")[0][0]}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setIsProfileOpen(true)}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button onClick={onLogOut} variant={"outline"}>
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you're done.
              <span className="flex md:hidden items-center text-xs mt-3">
                <span className="text-red-600 text-base mr-1">*</span>
                Click Image to Change Profile
              </span>
            </SheetDescription>
          </SheetHeader>
          <ProfileForm />
        </SheetContent>
      </Sheet>
    </>
  );
}
