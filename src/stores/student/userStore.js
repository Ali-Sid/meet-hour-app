import { createStore, useStore } from "zustand";
import axios from "axios";

const userStore = createStore((set) => ({
  user: null,
  fetchUser: async () => {
    const token = localStorage.getItem("student_token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = decodedToken.userId;
      const response = await axios.get(
        "http://localhost:3000/api/students/data",
        userId
      );
      const users = response.data;
      const user = users.find((user) => user.id === userId);
      if (user) {
        set({ user });
      }
    }
  },
}));

const useUserStore = () => useStore(userStore);

export default useUserStore;
