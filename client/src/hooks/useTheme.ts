import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) return savedTheme;

    
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    return "light";
  });

  
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark-theme");
      root.classList.remove("light-theme");
    } else {
      root.classList.add("light-theme");
      root.classList.remove("dark-theme");
    }

    
    localStorage.setItem("theme", theme);
  }, [theme]);

  
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);


  const setLightTheme = useCallback(() => {
    setTheme("light");
  }, []);

  const setDarkTheme = useCallback(() => {
    setTheme("dark");
  }, []);

  return {
    theme,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    isDark: theme === "dark",
    isLight: theme === "light",
  };
};
