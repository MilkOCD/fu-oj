import { useState, useEffect } from 'react';

function usePathname() {
    const [pathname, setPathname] = useState(window.location.pathname);

    useEffect(() => {
        // Tạo một sự kiện tùy chỉnh để theo dõi pushState và replaceState
        const handleLocationChange = () => {
            setPathname(window.location.pathname);
        };

        // Ghi đè pushState và replaceState để chúng kích hoạt sự kiện 'popstate'
        const pushState = history.pushState;
        const replaceState = history.replaceState;

        history.pushState = function (...args) {
            pushState.apply(history, args);
            window.dispatchEvent(new Event('popstate'));
        };

        history.replaceState = function (...args) {
            replaceState.apply(history, args);
            window.dispatchEvent(new Event('popstate'));
        };

        window.addEventListener('popstate', handleLocationChange);

        return () => {
            window.removeEventListener('popstate', handleLocationChange);
            // Khôi phục pushState và replaceState nếu cần
            history.pushState = pushState;
            history.replaceState = replaceState;
        };
    }, []);

    return pathname;
}

export default usePathname;
