"use client";

import { CheckCircle, AlertTriangle, XCircle, Shield } from "lucide-react";

const LevelIcon = ({
  level,
  flaggedItems = 0,
  checkedItems = 0,
  size = 20,
  className = "",
}) => {
  // If no items checked or flagged, show neutral shield
  if (flaggedItems === 0 && checkedItems === 0) {
    return <Shield className={`text-gray-400 ${className}`} size={size} />;
  }

  // If flagged items is 0, show success regardless of level
  if (flaggedItems === 0) {
    return (
      <CheckCircle className={`text-green-500 ${className}`} size={size} />
    );
  }

  // Show appropriate icon based on level
  switch (level) {
    case "danger":
      return <XCircle className={`text-red-500 ${className}`} size={size} />;
    case "warning":
      return (
        <AlertTriangle className={`text-yellow-400 ${className}`} size={size} />
      );
    case "good":
      return (
        <CheckCircle className={`text-green-500 ${className}`} size={size} />
      );
    default:
      return <Shield className={`text-gray-400 ${className}`} size={size} />;
  }
};

export default LevelIcon;
