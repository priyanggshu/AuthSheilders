import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "../context/Theme_Context";

const InputField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
    const { theme } = useTheme();

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700' }  mb-1`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          id={id}
          type={isPasswordField && showPassword ? "text" : type}
          className={`w-full px-4 py-2 rounded-lg border ${ theme === "dark" ? "border-gray-600 bg-gray-700 text-white placeholder-gray-500" : "border-gray-300 bg-white text-gray-900 placeholder-gray-400"} focus:ring-blue-500 focus:border-blue-500
          }       transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-50`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          autoComplete={autoComplete}
        />

        {isPasswordField && (
          <button
            type="button"
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${ theme === 'dark' ? 'text-gray-400' : 'text-gray-500' }`}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
