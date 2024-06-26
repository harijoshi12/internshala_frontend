// src/pages/Login.tsx

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../contexts/AuthContext";

// Define the structure of the login form inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

/**
 * Login component for user authentication.
 */
const Login: React.FC = () => {
  const { login } = useAuth(); // Get the login function from the authentication context
  const [loading, setLoading] = useState(false); // State to manage loading spinner
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: "onBlur",
    criteriaMode: "all",
  });
  const navigate = useNavigate(); // Hook to navigate programmatically

  /**
   * Handle form submission.
   * @param data - The login form data.
   */
  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    try {
      await login(data); // Call the login function with form data
      toast.success("Login successful!"); // Show success toast notification
      navigate("/"); // Navigate to the home page
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      toast.error(err?.response?.data?.message || "Login failed"); // Show error toast notification
    } finally {
      setLoading(false); // Hide the loading spinner
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <TextInput
          label="Email"
          type="email"
          placeholder="Email"
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={errors.email?.message}
          isRequired={true}
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Password"
          register={register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={errors.password?.message}
          isRequired={true}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <LoadingSpinner size="small" /> : "Login"}
        </Button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
