import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = [ "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500" ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`w-full h-1 bg-gray-300 rounded-3xl overflow-hidden`}>
        <div
          className={`h-2 transition-all ${ strengthColors[strength - 1] || "bg-gray-300" }`}
          style={{ width: `${(strength / 4) * 100}%` }} />
      </div>
      <p className="text-xs font-Krona mt-2 mb-4 text-gray-500">
        {strengthLabels[strength - 1] || "Very Weak"}
      </p>
    </motion.div>
  );
};

export default PasswordStrengthMeter;
