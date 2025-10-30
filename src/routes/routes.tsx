import Exercise from '../pages/Exercise/Exercise';
import Exercises from '../pages/Exercises/Exercises';
import Home from '../pages/Home/Home';
import routesConfig from './routesConfig';

const router: {
    path: string;
    element: React.ReactNode;
}[] = [
    {
        path: routesConfig.home,
        element: <Home />
    },
    {
        path: routesConfig.exercises,
        element: <Exercises />
    },
    {
        path: routesConfig.exercise,
        element: <Exercise />
    }
];

export default router;
