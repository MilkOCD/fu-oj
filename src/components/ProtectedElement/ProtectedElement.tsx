import { observer } from 'mobx-react-lite';
import authentication from '../../shared/auth/authentication';

interface ProtectedElementProps {
    children: React.ReactNode;
    acceptRoles: string[];
}

const ProtectedElement = observer(({ children, acceptRoles }: ProtectedElementProps) => {
    if (!acceptRoles.includes(authentication?.account?.data?.role)) return <></>;
    return <>{children}</>;
});

export default ProtectedElement;
