import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import OtpInput from "../components/OtpInput";
import Button from "../components/Button";

const OtpVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else setCanResend(true);
  }, [countdown]);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/dashboard");
    } catch (error) {
      console.error("OTP verification error:", error);
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCountdown(60);
      setCanResend(false);
      setOtp("");
      setError("");
    } catch (error) {
      console.error("Resend OTP error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="An OTP has been sent to your email. Please enter the 6-digit code below to verify your account."
    >
      <motion.div
        onSubmit={handleVerify}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <OtpInput length={6} value={otp} onChange={setOtp} />

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg">
            {error}
          </div>
        )}

        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading || otp.length !== 6}
        >
          Verify OTP
        </Button>

        <div className="mt-6 text-center">
          <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 mb-2">
            <Clock size={16} className="mr-1" />
            {canResend ? (
              <span>You can now resend the OTP</span>
            ) : (
              <span>Resend OTP in {countdown} seconds</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={!canResend || isLoading}
            className={`text-sm font-medium ${
              canResend && !isLoading
                ? "text-blue-600 hover:underline dark:text-blue-400 cursor-pointer"
                : "text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }`}
          >
            Resend OTP
          </button>
        </div>
      </motion.div>
    </AuthLayout>
  );
};

export default OtpVerification;