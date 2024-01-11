import React, { createContext, useContext } from "react";
import { getColors } from "theme-colors";

const ThemeContext = createContext(undefined);

const createPalette = (color) => {
  return getColors(color);
};

const usePalette = () => useContext(ThemeContext);

const ThemeProvider = ({ color, children }) => {
  const dynamicCssColorInjector = (palette) => {
    const dynamicColorVariableNames = {
      100: "--dynamic-color-100",
      500: "--dynamic-color-500",
      600: "--dynamic-color-600",
      700: "--dynamic-color-700"
    };

    Object.keys(dynamicColorVariableNames).forEach((key) => {
      document.documentElement.style.setProperty(dynamicColorVariableNames[key], palette[key]);
    });

    return dynamicColorVariableNames;
  };

  return (
    <ThemeContext.Provider value={dynamicCssColorInjector(createPalette(color))}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeProvider, usePalette };
