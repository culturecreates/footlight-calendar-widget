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
  const fallbackFont = 'Roboto';

  try {
    // Inject Google Fonts link
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(
      /\s+/g,
      '+',
    )}&display=swap`;

    fontLink.onerror = () => {
      console.error(`Failed to load the font: ${fontName}. Falling back to ${fallbackFont}.`);
      setFallbackFont();
    };

    document.head.appendChild(fontLink);

    // Apply the font to the #calendar-widget as a CSS variable
    const calendarWidget = document.getElementById('calendar-widget');
    if (calendarWidget) {
      calendarWidget.style.setProperty('--calendar-font-family', `'${fontName}', sans-serif`);
    } else {
      console.error('Calendar widget not found.');
      setFallbackFont();
    }
  } catch (error) {
    console.error('Error during font injection:', error);
    setFallbackFont();
  }

  // Function to apply fallback font
  const setFallbackFont = () => {
    const calendarWidget = document.getElementById('calendar-widget');
    if (calendarWidget) {
      calendarWidget.style.setProperty('--calendar-font-family', `'${fallbackFont}', sans-serif`);
    }
  };
};
