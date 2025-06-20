import { useState, useEffect } from "react";

/**
 * Returns a debounced value that only updates
 * after `delay` milliseconds have passed without changes.
 */

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    // Each time `value` changes, set a timer to update after `delay`.
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    // If `value` changes again before `delay` elapses, clean up the previous timer.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
}
