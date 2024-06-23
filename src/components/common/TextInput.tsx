import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
  isRequired?: boolean;
}

const TextInput: React.FC<Props> = (props) => {
  const {
    label,
    type,
    placeholder,
    register,
    error,
    isRequired = false,
  } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col mb-[2px]">
      <label htmlFor={register?.name} className="mb-1">
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          {...register}
          autoComplete="off"
          type={showPassword && type === "password" ? "text" : type}
          id={register?.name}
          placeholder={placeholder}
          className={`border border-gray-300 rounded-md px-3 py-2 w-full ${
            error ? "border-red-500" : ""
          }`}
        />
        {type === "password" && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3 cursor-pointer">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
