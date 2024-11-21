import { useRef, useEffect } from 'react';

type DebounceCallback = (...args: unknown[]) => void;

const useDebounce = (callback: DebounceCallback, delay: number) => {
  const timeoutRef = useRef<number | null>(null);

  const debouncedFunction = (...args: unknown[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
};

export default useDebounce;
