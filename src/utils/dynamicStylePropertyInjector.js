import { getColors } from 'theme-colors';
import { dynamicColorVariableNames, MAIN_DYNAMIC_COLOR } from '../constants/generalConstants';

export const dynamicCssColorInjector = (color) => {
  const palette = getColors(color);
  document.documentElement.style.setProperty(MAIN_DYNAMIC_COLOR, color);

  Object.keys(dynamicColorVariableNames).forEach((key) => {
    document.documentElement.style.setProperty(dynamicColorVariableNames[key], palette[key]);
  });
};

export const dynamicFontInjector = (fontName) => {
  const fallbackFont = 'Roboto';
  const sanitizedFontName = fontName.replace(/\s+/g, '+');
  const fontLinkId = 'dynamic-font-link';

  // Function to set font-family
  const setFontFamily = (font) => {
    const calendarWidget = document.getElementById('calendar-widget');
    if (calendarWidget) {
      calendarWidget.style.setProperty('--calendar-font-family', `'${font}', sans-serif`);
    } else {
      console.error('Calendar widget not found.');
    }
  };

  // Check if the font link is already injected
  if (!document.getElementById(fontLinkId)) {
    try {
      const fontLink = document.createElement('link');
      fontLink.id = fontLinkId;
      fontLink.rel = 'stylesheet';
      fontLink.href = `https://fonts.googleapis.com/css2?family=${sanitizedFontName}&display=swap`;

      fontLink.onerror = () => {
        console.error(`Failed to load the font: ${fontName}. Falling back to ${fallbackFont}.`);
        setFontFamily(fallbackFont);
      };

      document.head.appendChild(fontLink);
      setFontFamily(fontName); // Apply the custom font
    } catch (error) {
      console.error('Error during font injection:', error);
      setFontFamily(fallbackFont);
    }
  } else {
    console.warn('Font link already exists. Skipping redundant injection.');
    setFontFamily(fontName); // Ensure font is applied
  }
};
