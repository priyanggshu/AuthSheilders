import React from "react";
import { Loader2 } from "lucide-react";
import { useTheme } from "../context/Theme_Context";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  onClick,
}) => {
  const baseClasses =
    "relative flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    const { theme } = useTheme();

  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: `${ theme === 'dark' ?  'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800' } focus:ring-gray-500 `,
    outline:
      `border ${ theme === 'dark' ? "text-gray-300 hover:bg-gray-700 border-gray-600" : "border-gray-300 hover:bg-gray-50 text-gray-700" } focus:ring-gray-500`,
  };

  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass =
    disabled || isLoading ? "opacity-70 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass}`}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};

export default Button;
