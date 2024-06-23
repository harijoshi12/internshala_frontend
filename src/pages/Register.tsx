// src/pages/Register.tsx

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

interface RegisterFormInputs {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const { register: registerUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    mode: "onBlur",
    criteriaMode: "all",
  });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        fullName: data.fullname,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <TextInput
          label="Full Name"
          type="text"
          placeholder="Full Name"
          register={register("fullname", {
            required: "Full Name is required",
            minLength: {
              value: 2,
              message: "Full Name must be at least 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Full Name must be less than 50 characters",
            },
          })}
          error={errors.fullname?.message}
          isRequired={true}
        />
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
        <TextInput
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          register={register("confirmPassword", {
            required: "Confirm Password is required",
            minLength: {
              value: 6,
              message: "Confirm Password must be at least 6 characters",
            },
          })}
          error={errors.confirmPassword?.message}
          isRequired={true}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <LoadingSpinner size="small" /> : "Register"}
        </Button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default Register;
