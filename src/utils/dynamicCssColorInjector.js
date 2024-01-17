export const dynamicCssColorInjector = (palette) => {
  const dynamicColorVariableNames = {
    50: '--dynamic-color-50',
    100: '--dynamic-color-100',
    500: '--dynamic-color-500',
    600: '--dynamic-color-600',
    700: '--dynamic-color-700',
  };

  Object.keys(dynamicColorVariableNames).forEach((key) => {
    document.documentElement.style.setProperty(dynamicColorVariableNames[key], palette[key]);
  });
};
