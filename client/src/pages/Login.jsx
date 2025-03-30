import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useTheme } from "../context/Theme_Context";
import { AlertCircle } from "lucide-react";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: "login" }).then((token) => {
            setRecaptchaToken(token);
          });
        });
      }
    };
    loadRecaptcha();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value }));
    if (errors[name]) { setErrors((prev) => ({ ...prev, [name]: undefined })) }
    if (loginError) setLoginError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");

    if (!formData.email || !formData.password) {
      setErrors({ email: "Email is required", password: "Password is required" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("path", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      if (data.mfaEnabled) {
        navigate("/otp", { state: { csrfToken: data.csrfToken } });
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(" Invalid email or password. Please try again. ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your acount to continue"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {loginError && (
          <div
            className={`mb-4 p-4 ${
              theme === "dark" ? "bg-red-900/20" : "bg-red-50"
            } rounded-lg flex items-start`}
          >
            <AlertCircle
              className={`h-6 w-6 ${
                theme === "dark" ? "text-red-400" : "text-red-600"
              } mr-2 mt-1`}
            />
            <span
              className={`text-sm ${
                theme === "dark" ? "text-red-400" : "text-red-600"
              }`}
            >
              {loginError}
            </span>
          </div>
        )}

        <InputField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />

        <InputField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="Current-password"
        />

        <div className="flex items-center justify-between mb-8">
          <div className="flex font-Syne font-semibold items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className={`h-4 w-4 text-blue-600  focus:ring-blue-500  rounded-2xl ${
                theme === "dark"
                  ? "border-gray-600 bg-gray-700"
                  : "border-gray-300"
              }`}
            />
            <label
              htmlFor="remember-me"
              className={`ml-2 block text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              } `}
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a
              href="#"
              className={`font-Montserrat ${
                theme === "dark" ? "text-blue-400" : "text-blue-600"
              } hover:underline`}
            >
              Forgot password?
            </a>
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={!recaptchaToken}
        >
          Sign in
        </Button>

        <p
          className={`mt-4 text-center text-sm font-Montserrat ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Don't have an account?
          <Link
            to="/signup"
            className={`font-medium ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }  hover:underline hover:text-blue-400 hover:font-semibold`}
          >
            Sign up
          </Link>
        </p>
      </motion.form>
    </AuthLayout>
  );
};

export default Login;
