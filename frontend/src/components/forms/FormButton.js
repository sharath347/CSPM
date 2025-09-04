"use client";

const FormButton = ({
  type = "button",
  children,
  onClick,
  disabled = false,
  variant = "primary", // primary, secondary, danger
  className = "",
  ...props
}) => {
  const baseClasses =
    "w-full font-medium py-3 rounded-xl transition-colors cursor-pointer";

  const variantClasses = {
    primary: "border border-green-900 hover:border-green-700 text-white/80",
    secondary: "border border-blue-900 hover:border-blue-700 text-white/80",
    danger: "border border-red-900 hover:border-red-700 text-white/80",
  };

  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default FormButton;
