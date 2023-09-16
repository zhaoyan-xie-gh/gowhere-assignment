import { isEqual } from "lodash";
import { useEffect, useState } from "react";

// see https://github.com/tannerlinsley/react-query/issues/293
export function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const isNewValuePassed = !isEqual(debouncedValue, value);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (isNewValuePassed) {
        setDebouncedValue(value);
      }
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, isNewValuePassed]);

  return debouncedValue;
}
