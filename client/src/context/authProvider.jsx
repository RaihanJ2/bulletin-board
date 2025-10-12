import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${API_URL}/profile`, {
        withCredentials: true,
      });
      setUser(res.data.user);
      return res.data.user;
    } catch (error) {
      setUser(null);
      console.error("Auth check error:", error);
      return null;
    } finally {
      setLoading(false);
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
    try {
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear user locally even if server logout fails
      setUser(null);
    }
  };

  const value = {
    user,
    loginUser,
    logoutUser,
    checkAuth,
    isAuthenticated: !!user,
    loading,
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
