import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import OtpInput from "../components/OtpInput";
import Button from "../components/Button";
import { useTheme } from "../context/Theme_Context";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [csrfToken, setCsrfToken] = useState(location.state?.csrfToken || "");

  useEffect(() => {
    if (!csrfToken) {
      const tokenFromStorage = localStorage.getItem("csrfToken");
      if (tokenFromStorage && !csrfToken) setCsrfToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    const lastSavedTime = localStorage.getItem("otpLastSentTime");
    if (lastSavedTime) {
      const elapsedTime = Math.floor((Date.now() - lastSavedTime) / 1000);
      const newCountdown = Math.max(60 - elapsedTime, 0);
      setCountdown(newCountdown);
      setCanResend(newCountdown === 0);
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      localStorage.setItem("otpCountdown", countdown);
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
      localStorage.removeItem("otpCountdown");
    }
  }, [countdown]);

  useEffect(() => {
    setOtp("");
  }, []);

  useEffect(() => {
    setError("");
  }, [otp]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("path", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid OTP");

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    const lastSentTime = localStorage.getItem("otpLastSentTime");
    if (lastSentTime) {
      const elapsedTime = Math.floor((Date.now() - lastSentTime) / 1000);
      if (elapsedTime < 60) {
        setError(`Please wait ${60 - elapsedTime} seconds before resending.`);
        return;
      }
    }  

    setCanResend(false);
    setIsLoading(true);
    setCountdown(60);
    localStorage.setItem("otpLastSentTime", Date.now());

    try {
      const response = await fetch("path", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to resend OTP");

      setOtp("");
      setError("");
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="An OTP has been sent to your email. Please enter the 6-digit code below to verify your account."
    >
      <form onSubmit={handleVerify}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <OtpInput length={6} value={otp} onChange={setOtp} />

          <input type="hidden" name="csrfToken" value={csrfToken} />

          {error && (
            <div
              className={`mb-4 p-3 ${
                theme === "dark"
                  ? "bg-red-900/20 text-red-400"
                  : "text-red-600 bg-red-50"
              } text-sm rounded-lg`}
            >
              {error}
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading || otp.length !== 6}
          >
            <span className={`font-Syne text-lg font-bold text-white`}>
              Verify OTP
            </span>
          </Button>

          <div className="mt-6 text-center">
            <div
              className={`flex items-center justify-center text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              } mb-2`}
            >
              <Clock size={16} className="mr-1" />
              {canResend ? (
                <span className="font-Syne">You can now resend the OTP</span>
              ) : (
                <span>Resend OTP in {countdown} seconds</span>
              )}
            </div>

            <button
              type="button"
              onClick={handleResendOtp}
              disabled={!canResend || isLoading}
              className={`text-sm border p-2 mt-2 rounded-xl hover:bg-black/10 font-medium ${
                canResend && !isLoading
                  ? ` hover:underline ${
                      theme === "dark" ? "text-blue-400" : "text-blue-700"
                    } cursor-pointer`
                  : `${
                      theme === "dark" ? "text-gray-500" : "text-gray-400"
                    } cursor-not-allowed`
              }`}
            >
              Resend OTP
            </button>
          </div>
        </motion.div>
      </form>
    </AuthLayout>
  );
};

export default OtpVerification;
