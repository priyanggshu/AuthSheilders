import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useTheme } from "../context/Theme_Context";
import PasswordStrengthMeter from "../components/PasswordStrength";

const Signup = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/otp", { state: { csrfToken: "dummyCsrfToken" } });
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      setIsLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setErrors((prev) => ({
        ...prev,
        agreeToTerms: "You must agree to the Terms of Service",
      }));
      setIsLoading(false);
      return;
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join our secure platform in just a few steps"
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transform={{ delay: 0.1 }}
      >
        <InputField
          id="fullname"
          name="fullName"
          label="Full Name"
          type="text"
          placeholder="Jhonny Depp"
          value={formData.fullName}
          onChange={handleChange}
          required
          autoComplete="name"
        />

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
          autoComplete="new-password"
        />

        <PasswordStrengthMeter password={formData.password} />

        <InputField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />

        <div className="mb-8">
          <div className="flex items-start">
            <div className="flex items-center h-6">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className={`w-4 h-4 text-blue-600 rounded focus:ring-blue-500 ${
                  theme === "dark"
                    ? "border-gray-600 bg-gray-700"
                    : "border-gray-300"
                } `}
              />
            </div>
            <div className="ml-2 text-sm">
              <label
                htmlFor="agreeToTerms"
                className={`font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                I agree to the{" "}
                <a
                  href="#"
                  className={`${
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }  hover:underline`}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className={`${
                    theme === "dark" ? "text-blue-400" : "text-blue-600 "
                  } hover:underline`}
                >
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          Send OTP
        </Button>

        <p
          className={`mt-4 text-center font-Montserrat text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          } `}
        >
          Already have an account?{" "}
          <Link
            to="/"
            className={`font-medium ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            } hover:underline `}
          >
            Sign in
          </Link>
        </p>
      </motion.form>
    </AuthLayout>
  );
};

export default Signup;
