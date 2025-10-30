import { observer } from 'mobx-react-lite';
import { Navigate } from 'react-router-dom';
import authentication from '../../shared/auth/authentication';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = observer(({ children }: ProtectedRouteProps) => {
    if (!authentication.isAuthenticated && !authentication.loading) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
});

export default ProtectedRoute;
