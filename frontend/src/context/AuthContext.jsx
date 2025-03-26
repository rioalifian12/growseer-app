import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  logoutUser,
  fetchUserById,
  registerUser,
} from "../services/ServiceUser";

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

      switch (response.user.role) {
        case "customer":
          navigate("/");
          break;
        case "superadmin":
          navigate("/superadmin");
          break;
        case "inventory":
          navigate("/inventory");
          break;
        case "sales":
          navigate("/sales");
          break;
        default:
          navigate("/");
      }
      return response.user;
    } catch (error) {
      console.error(`Login error: ${error.message}`);
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await registerUser(userData);
      navigate("/login");
      return response;
    } catch (error) {
      console.error(`Signup error: ${error.message}`);
      throw error;
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
      localStorage.removeItem("role");
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
