import { useState, useEffect } from 'react';

/**
 * Get current browser window's size
 * @HowToUse const windowSize = useWindowSize();
 * {windowSize.width}
 * @returns Object with 2 props width, height
 */
const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowSize;
};

export default useWindowSize;
