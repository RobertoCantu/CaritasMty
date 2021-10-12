import { lazy } from 'react';

const routes = [
    {
        path:'home',
        component: lazy(() => import('../components/Home/Home')),
        exact: true,
    },
    {
        path:'blogs',
        component: lazy(() => import('../components/Blogs/Blogs')),
        exact: true,
    },
];

export default routes;