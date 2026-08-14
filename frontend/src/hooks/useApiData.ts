import { useEffect, useState } from 'react';

/**
 * Fetches live data from the backend. If the request fails (backend not running,
 * network error, etc.) it silently falls back to the provided static data so the
 * site still renders — but `isLive` tells you which one you actually got, which is
 * useful while wiring things up and debugging in dev.
 */
export function useApiData<T>(fetcher: () => Promise<T>, fallback: T) {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetcher()
      .then(result => {
        if (cancelled) return;
        // Treat an empty array as "backend reachable but not seeded yet" —
        // still prefer showing the fallback so the page isn't blank.
        if (Array.isArray(result) && result.length === 0) {
          setIsLive(false);
        } else {
          setData(result);
          setIsLive(true);
        }
      })
      .catch(() => {
        if (!cancelled) setIsLive(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, isLive };
}
