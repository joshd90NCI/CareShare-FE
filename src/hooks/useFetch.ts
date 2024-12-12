import { useState, useEffect, useCallback } from 'react';
import { getErrorMessageFromStatus } from '../utils.ts';

// Actually didn't end up using this in many places throughout the code as most of the fetching was done
// through generic fetch with functions as a lot of the fetch requests did not happen at the top level of the code.
function useFetch<T>(url: string, options: RequestInit = {}) {
  // Keep track of our different states in neatly abstracted logic
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  // Wrap in useCallback to memoize it so that it can be passed to useEffect if needs be
  const fetchDataFunction = useCallback(
    async (signal: AbortSignal) => {
      setLoading(true);
      setError(null);

      try {
        // Abort controller can be passed to this
        const response = await fetch(url, { ...options, signal });

        // update our error state as required
        if (!response.ok) {
          const message = getErrorMessageFromStatus(response.status);
          setError(message);
          return;
        }
        // Depending on how the nature of the content we get back will determine how we manipulate the data
        const contentType = response.headers.get('content-type');
        if (!contentType) {
          setError('Nothing was found');
          return;
        }

        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          // If the object is empty no data is present
          if (Object.keys(result).length === 0) {
            setError('No data found.');
          }
          // otherwise set data
          setData(result);
        } else {
          setError('Unexpected Response format');
        }
      } catch (err) {
        if (!(err instanceof Error)) {
          setError('An unexpected error occurred');
          return;
        }
        // Abort errors happen regularly especially in safe-mode and don't need to be logged
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
        // Switch off our loading state
      } finally {
        setLoading(false);
      }
    },
    [options, url]
  );

  // This is how we abort the controller if the component unmounts!
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    fetchDataFunction(signal).then();

    return () => {
      controller.abort(); // Cancels the fetch request on unmount
    };
  }, [url, options]);

  return { data, loading, error, fetchDataFunction };
}

export default useFetch;
