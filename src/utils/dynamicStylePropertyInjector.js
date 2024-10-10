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

export const dynamicFontInjector = (fontName) => {
  if (fontName === 'Roboto') return;

  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
    /\s+/g,
    '+',
  )}&display=swap`;

  document.head.appendChild(fontLink);

  const calendarWidget = document.getElementById('calendar-widget');
  if (calendarWidget) {
    calendarWidget.style.fontFamily = `'${fontName}', sans-serif`;
  }
};
