import React, { createContext, useState, useContext, useEffect } from "react";
import { readData, saveTheme } from "../Components/Storage";
import { APP_THEME, APP_THEME_DARK } from "../Style/colorScheme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const initializeTheme = async () => {
      saveTheme("THEME", "light");
    };
    initializeTheme();
  }, []);

  useEffect(() => {
    readData("THEME").then((theme) =>
      setIsDarkMode(theme === "dark" ? true : false)
    );
  }, []);

  const toggleTheme = async () => {
    setIsDarkMode(!isDarkMode);
  };

  const getAppTheme = () => {
    return isDarkMode ? APP_THEME_DARK : APP_THEME;
  };
  const getIsDarkMode = () => {
    return isDarkMode;
  };

  return (
    <ThemeContext.Provider
      value={{ isDarkMode, toggleTheme, getAppTheme, getIsDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
