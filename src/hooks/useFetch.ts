import { useState, useEffect, useCallback } from 'react';
import { getErrorMessageFromStatus } from '../utils.ts';

function useFetch<T>(url: string, options: RequestInit = {}) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  const fetchDataFunction = useCallback(
    async (signal: AbortSignal) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { ...options, signal });

        if (!response.ok) {
          const message = getErrorMessageFromStatus(response.status);
          setError(message);
          return;
        }
        const contentType = response.headers.get('content-type');
        if (!contentType) {
          setError('Nothing was found');
          return;
        }
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          if (Object.keys(result).length === 0) {
            setError('No data found.');
          }
          setData(result);
        } else {
          setError('Unexpected Response format');
        }
      } catch (err) {
        if (!(err instanceof Error)) {
          setError('An unexpected error occurred');
          return;
        }
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [options, url]
  );

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
