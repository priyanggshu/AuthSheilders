import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/Theme_Context";

const OtpInput = ({ length, value, onChange }) => {
  const [otp, setOtp] = useState(
    value.split("").concat(Array(length - value.length).fill(""))
  );
  const inputRefs = useRef([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const newValue = e.target.value;
    if (newValue.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = newValue;
    setOtp(newOtp);
    onchange(newOtp.join(""));

    if (newValue && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0 && inputRefs.current[index - 1]) {
          inputRefs.current[index - 1].focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChange(newOtp.join(""));
      }
    }

    if (e.key === "ArrowLeft" && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }

    if (
      e.key === "ArrowRight" &&
      index < length - 1 &&
      inputRefs.current[index + 1]
    ) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    if (!/^\d+$/.test(pastedData)) return;

    const pastedOtp = pastedData.slice(0, length).split("");
    const newOtp = [...Array(length).fill("")];

    pastedOtp.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
    onChange(newOtp.join(""));

    const nextEmptyIndex = newOtp.findIndex((val) => val === "");
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;

    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };

  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 mb-6">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={index === 0 ? handlePaste : undefined}
          className={`w-12 h-14 text-center font-Krona text-xl font-semibold border ${ theme === 'dark' ? "bg-gray-700 border-gray-600 text-white" : "border-gray-300" }  rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500  transition-colors duration-200`}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default OtpInput;
