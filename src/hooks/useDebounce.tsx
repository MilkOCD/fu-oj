import { useState, useEffect } from 'react';

/**
 *
 * @param value
 * @param delay after delay time, return last value equal to input value ~ delay time should be between 500-800 milisecond
 * @returns value
 */
function useDebounce(value: any, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Variable handler to get setTimeout id
        const handler = setTimeout(() => setDebouncedValue(value), delay);

        // Call when function be cleaned up
        return () => clearTimeout(handler);
    }, [value]);

    return debouncedValue;
}

export default useDebounce;
