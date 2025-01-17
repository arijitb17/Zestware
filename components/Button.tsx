import React from "react";

interface ButtonProps {
  label?: string;
  children?: React.ReactNode; // Add children prop for button content
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  isDisabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  isDisabled = false,
  className = "",
}) => {
  const baseStyles =
    "rounded-md font-medium focus:outline-none focus:ring-2 transition-all";

  const variantStyles = {
    primary: "bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 focus:ring-gray-400 text-white",
    danger: "bg-red-500 hover:bg-red-600 focus:ring-red-400 text-white",
  };

  const sizeStyles = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-md",
    large: "px-8 py-4 text-lg",
  };

  const disabledStyles = isDisabled
    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
    : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {children || label}
    </button>
  );
};

export default Button;
