"use client";

const FormInput = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  disabled = false,
  required = false,
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={`w-full px-4 py-3 bg-[#2a2a31] rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      {...props}
    />
  );
};

export default FormInput;
