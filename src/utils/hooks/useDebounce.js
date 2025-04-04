import { useRef, useCallback } from 'react';

export const useDebounce = (callback, delay) => {
  const debouncedRef = useRef(null);

  const debouncedCallback = useCallback(
    (...args) => {
      if (debouncedRef.current) {
        clearTimeout(debouncedRef.current);
      }
      debouncedRef.current = setTimeout(() => callback(...args), delay);
    },
    [callback, delay],
  );

  return debouncedCallback;
};
