import { useRef, useEffect } from 'react';

type DebounceCallback = (...args: unknown[]) => void;

const useDebounce = (callback: DebounceCallback, delay: number) => {
  // create a distinct object that will persist between renders with useRef
  const timeoutRef = useRef<number | null>(null);

  // spread the args in case the debounced function has any params
  const debouncedFunction = (...args: unknown[]) => {
    // If our timeref exists, cancel it
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // create a new one effectively restarting the clock
    timeoutRef.current = setTimeout(() => {
      callback(...args); // our call back calls the debounced argument
    }, delay);
  };

  // Cleanup timeout on unmount to avoid memory leaks and doubling up on timeouts between renders
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
