import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${API_URL}/profile`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
      console.error("Auth check error:", error);
    }
  };
  const loginUser = async (email, password) => {
    const res = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res.data;
  };

  const logoutUser = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
    setUser(null);
  };

  const value = {
    user,
    loginUser,
    logoutUser,
    checkAuth,
    isAuthenticated: !!user,
  };
  useEffect(() => {
    checkAuth();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
