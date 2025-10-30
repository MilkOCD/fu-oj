// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { setupAxiosInterceptors } from './lib/httpRequest.tsx';

setupAxiosInterceptors(() => {
    // Callback khi 401
    console.log('Token expired → logout');
    localStorage.removeItem('authenticationToken');
    sessionStorage.removeItem('authenticationToken');
    window.location.href = '/login';
});

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <App />
    // </StrictMode>,
);
