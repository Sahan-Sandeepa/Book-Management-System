import { create } from "zustand";

interface AuthState {
  user: { id: number; name: string; email: string } | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: AuthState["user"], token: string) => void;
  logout: () => void;
  initializeFromStorage: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,

  login: (user, token) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);
    set({ user, token, isLoggedIn: true });
  },

  logout: () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    set({ user: null, token: null, isLoggedIn: false });
  },

  initializeFromStorage: () => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");
    if (storedUser && storedToken) {
      set({
        user: JSON.parse(storedUser),
        token: storedToken,
        isLoggedIn: true,
      });
    }
  },
}));
