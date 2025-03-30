import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import Button from "../components/Button";
import PasswordStrengthMeter from "../components/PasswordStrength";
import { useTheme } from "../context/Theme_Context";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const { theme } = useTheme();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setMessage("A password reset link has been sent to your email.");
    } catch (error) {
      console.error("Error sending reset link:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your email to receive a reset link">
      <motion.form 
        onSubmit={handleSubmit} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <InputField
          id="email"
          name="email"
          label="Email Address"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        
        <div className="mt-6">
          <Button type="submit" fullWidth isLoading={isLoading}>
            Send Reset Link
          </Button>
        </div>
        
        {message && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className={`mt-4 text-green-500 text-center font-Syne`}
          >
            {message}
          </motion.p>
        )}
        
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className={`text-sm font-Syne ${theme === 'dark' ? 'text-gray-400 hover:text-blue-400' : 'text-gray-600 hover:text-blue-600'} transition-colors`}
          >
            Return to login
          </button>
        </div>
      </motion.form>
    </AuthLayout>
  );
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ 
    password: "", 
    confirmPassword: "" 
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { theme } = useTheme();
  
  // Get CSRF token from location state or use a default
  const csrfToken = location.state?.csrfToken || "dummyCsrfToken";
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error resetting password:", error);
      setErrors({ form: "Failed to reset password. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthLayout title="Reset Password" subtitle="Enter a new password for your account">
      <motion.form 
        onSubmit={handleSubmit} 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <input type="hidden" name="csrfToken" value={csrfToken} />
        
        <InputField
          id="password"
          name="password"
          label="New Password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        
        {errors.password && (
          <p className="text-red-500 text-sm mt-1 mb-2">{errors.password}</p>
        )}
        
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
        
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1 mb-2">{errors.confirmPassword}</p>
        )}
        
        {errors.form && (
          <div className={`p-3 mb-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/30' : 'bg-red-100'}`}>
            <p className="text-red-500 text-sm">{errors.form}</p>
          </div>
        )}
        
        {success && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className={`p-3 mb-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}
          >
            <p className={`text-green-500 text-sm`}>Password successfully reset! Redirecting...</p>
          </motion.div>
        )}
        
        <div className="mt-6">
          <Button type="submit" fullWidth isLoading={isLoading}>
            Reset Password
          </Button>
        </div>
      </motion.form>
    </AuthLayout>
  );
};

export { ForgotPassword, ResetPassword };