import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser, fetchUserById } from "../services/ServiceUser";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        try {
          const userData = await fetchUserById(userId);
          if (userData) {
            setUser(userData);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          logout();
        }
      }
    };
    checkUser();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);
      setUser(response.user);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.user.id);
      if (response.user.role === "customer") {
        navigate("/");
      } else if (response.user.role === "superadmin") {
        navigate("/superadmin");
      } else if (response.user.role === "inventory") {
        navigate("/inventory");
      } else if (response.user.role === "sales") {
        navigate("/sales");
      }
      return { success: true };
    } catch (error) {
      alert("Login failed: " + error.message);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
