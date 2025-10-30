import { useState, useEffect } from 'react';

/**
 * Observe key which pressed
 * @HowToUse const isEnterKeyPressed = useKeyPress('Enter');
 * @param targetKey
 * @returns Is an target key pressed: boolean
 */
const useKeyPress = (targetKey: string) => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        const handleKeyDown = ({ key }: { key: any }) => {
            if (key === targetKey) {
                setKeyPressed(true);
            }
        };

        const handleKeyUp = ({ key }: { key: any }) => {
            if (key === targetKey) {
                setKeyPressed(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [targetKey]);

    return keyPressed;
};

export default useKeyPress;
