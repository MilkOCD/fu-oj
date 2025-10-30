import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number) => {
    const savedCallback: any = useRef(null);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const tick = () => {
            savedCallback.current();
        };

        if (delay !== null) {
            const intervalId = setInterval(tick, delay);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [delay]);
};

export default useInterval;
