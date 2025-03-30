import React from "react";
import { motion } from "framer-motion";
import { Shield, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/Theme_Context";

const AuthLayout = ({ children, title, subtitle }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme === 'dark' ? "from-gray-900 to-gray-800" : "from-gray-50 to-gray-100" }  transition-colors duration-300 p-4`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`w-full max-w-md ${theme === "dark" ? "bg-gray-800" : "bg-white" } rounded-2xl shadow-xl overflow-hidden`}
      >
        <div className="relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === "dark" ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600  hover:bg-gray-200' }  transition-colors `}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-blue-500 p-3 rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>

            <h1 className={`text-xl font-Krona font-bold text-center ${theme === "dark" ? 'text-white' : 'text-gray-800' } mb-2`}>
              {title}
            </h1>

            {subtitle && (
              <p className={`text-center font-Syne ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600' } mb-8`}>
                {subtitle}
              </p>
            )}

            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;