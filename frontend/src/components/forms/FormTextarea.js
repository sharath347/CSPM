"use client";

const FormTextarea = ({
  placeholder,
  value,
  onChange,
  rows = 6,
  className = "",
  disabled = false,
  required = false,
  ...props
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      disabled={disabled}
      required={required}
      className={`w-full px-4 py-3 bg-[#2a2a31] rounded-xl border border-gray-700 focus:border-blue-500 focus:outline-none transition-colors resize-none ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      {...props}
    />
  );
};

export default FormTextarea;
