interface IPageRoutes {
    [key: string]: string;
}

const routesConfig: IPageRoutes = {
    home: 'home',
    exercises: 'exercises',
    exercise: 'exercise/:id?'
};

export default routesConfig;
