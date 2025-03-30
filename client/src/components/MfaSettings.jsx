import { useState } from "react";

const MFASettings = () => {
  const [isMfaEnabled, setIsMfaEnabled] = useState(false);

  const handleToggle = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to change MFA settings?"
    );
    if (userConfirmed) {
      setIsMfaEnabled(!isMfaEnabled);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <span className="text-lg font-semibold">
        Enable Multi-Factor Authentication (MFA)
      </span>
      <button
        onClick={handleToggle}
        className={`p-2 rounded ${
          isMfaEnabled ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        {isMfaEnabled ? "Enabled" : "Disabled"}
      </button>
    </div>
  );
};

export default MFASettings;