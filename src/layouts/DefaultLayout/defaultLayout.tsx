import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import LayoutFooter from './components/LayoutFooter';
import LayoutHeader from './components/LayoutHeader';
import LayoutMenu from './components/LayoutMenu';
import classnames from 'classnames';
import globalStore from '../../components/GlobalComponent/globalStore';

const DefaultLayout = observer(() => {
    useEffect(() => {}, []);

    return (
        <div className="default-layout">
            <LayoutHeader />
            <div
                className={classnames('layout-content flex', {
                    'flex-col': globalStore.windowSize.width < 1300
                })}
            >
                <LayoutMenu />
                <div
                    className={classnames('outlet', {
                        'outlet-responsive': globalStore.windowSize.width < 1300,
                        'outlet-min': globalStore.windowSize.width < 675
                    })}
                >
                    <Outlet />
                </div>
            </div>
            <LayoutFooter />
        </div>
    );
});

export default DefaultLayout;
