import { contentLanguages } from '../constants/generalConstants';

export const getLocalized = (obj, locale) => {
  if (obj?.[locale]) return obj[locale];

  for (const lang of Object.values(contentLanguages)) {
    if (obj?.[lang]) return obj[lang];
  }

  return '';
};
