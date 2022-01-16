import { AddRouteProps } from '../types/interfaces';
import Route404 from './404.route';

// Define routes
const routes: Omit<AddRouteProps, 'router'>[] = [
    {
        path: '',
        handler: Route404,
    }, 
];

export default routes;