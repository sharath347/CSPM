"use client";

import { useEffect, useState } from "react";

const DashboardCard = ({
  title,
  value,
  description,
  icon,
  children,
  onClick,
  className = "",
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  // Detect if value is numeric or string (like "97.5%")
  const isNumeric = typeof value === "number";
  const finalValue = value ?? 0;

  useEffect(() => {
    if (!isNumeric) return; // skip animation for strings like "97.5%"

    let current = 0;
    const duration = 1000; // 1s animation
    const steps = 30;
    const increment = Math.ceil(finalValue / steps);
    const intervalTime = Math.ceil(duration / steps);

    const interval = setInterval(() => {
      current += increment;
      if (current >= finalValue) {
        current = finalValue;
        clearInterval(interval);
      }
      setDisplayValue(current);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [finalValue, isNumeric]);

  return (
    <div
      className={`bg-[#111] border border-gray-800 rounded-2xl p-5 w-full shadow-md ${className}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-white font-semibold">{title}</h2>
        {icon}
      </div>

      {/* Show animated number OR raw string */}
      <div className="text-3xl font-bold text-white">
        {isNumeric ? displayValue : value}
      </div>

      <p className="text-sm text-gray-400">{description}</p>
      {children}
    </div>
  );
};

export default DashboardCard;
