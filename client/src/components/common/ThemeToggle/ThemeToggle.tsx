import React from "react";
import "./ThemeToggle.css";

interface ThemeToggleProps {
  theme: "light" | "dark";
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Переключить на ${
        theme === "light" ? "тёмную" : "светлую"
      } тему`}
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">
          {theme === "light" ? "☀️" : "🌙"}
        </div>
      </div>
      <span className="theme-toggle-label">
        {theme === "light" ? "Тёмная тема" : "Светлая тема"}
      </span>
    </button>
  );
};

export default ThemeToggle;
