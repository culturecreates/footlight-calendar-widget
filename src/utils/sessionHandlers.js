import { getDefaultSessionStorageVariableNames } from '../constants/sessionStorageVariableNames';

export const setSessionStorageVariables = (index, values, singleKey = null) => {
  const storageKeys = getDefaultSessionStorageVariableNames(index);

  if (singleKey) {
    const storageKey = storageKeys[singleKey];
    if (storageKey && values[singleKey] !== null && values[singleKey] !== undefined) {
      sessionStorage.setItem(storageKey, values[singleKey]);
    }
  } else {
    Object.entries(storageKeys).forEach(([key, storageKey]) => {
      if (values[key] !== null && values[key] !== undefined) {
        sessionStorage.setItem(storageKey, values[key]);
      }
    });
  }
};
