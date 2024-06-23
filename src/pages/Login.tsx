import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import TextInput from "../components/common/TextInput";
import Button from "../components/common/Button";
import { login as loginUser } from "../services/api";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<LoginFormInputs>({
    mode: "onBlur",
    criteriaMode: "all",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const response = await loginUser(data);
      localStorage.setItem("token", response.data.token);
      login(response.data.user);
      toast.success("Login successful!");
      navigate("/opportunities");
    } catch (err) {
      toast.error("Invalid email or password");
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
        />
        <TextInput
          label="Password"
          type="password"
          placeholder="Password"
          register={register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />
        <Button type="submit" className="w-full">
          Login
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
