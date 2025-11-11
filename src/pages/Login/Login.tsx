import { observer } from 'mobx-react-lite';
import DefaultLayout from '../../layouts/DefaultLayout/defaultLayout';
import { LRComponent } from '../components/LRComponent/LRComponent';

const Login = observer(() => {
    return (
        <>
            <DefaultLayout />
            <LRComponent />
        </>
    );
});

export default Login;
