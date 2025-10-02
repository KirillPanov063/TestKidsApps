import React from "react";
import "./Button.css";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  disabled = false,
  variant = "primary",
  loading = false,
}) => {
  return (
    <button
      className={`button button-${variant}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Загрузка..." : children}
    </button>
  );
};

export default Button;
