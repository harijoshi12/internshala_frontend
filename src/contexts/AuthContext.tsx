// src/contexts/AuthContext.tsx

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { User, LoginCredentials, RegisterCredentials } from "../types";
import { login, register } from "../services/api";
import axios from "axios";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response: any = await login(credentials);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed", error.response?.data || error.message);
      } else {
        console.error("Unexpected error during login", error);
      }
      throw error;
    }
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    try {
      const response: any = await register(credentials);
      setUser(response.user);
      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Registration failed",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error during registration", error);
      }
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
