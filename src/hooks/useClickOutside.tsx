import type { RefObject } from 'react';
import { useEffect } from 'react';

const useClickOutside = (ref: RefObject<any>, handleClickOutside: () => void) => {
    useEffect(() => {
        const handleClick = (event: any) => {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClickOutside();
            }
        };

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [ref, handleClickOutside]);
};

export default useClickOutside;
