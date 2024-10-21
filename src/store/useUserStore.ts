import { create } from "zustand";

interface User {
  profile_image: string;
  name: string;
  email: string;
}

interface Store {
  user: User;
  setUser: (user: User) => void;
}

const useUserStore = create<Store>((set) => ({
  user: { profile_image: "", name: "", email: "" },
  setUser: (user: User) => set({ user }),
}));

export default useUserStore;
