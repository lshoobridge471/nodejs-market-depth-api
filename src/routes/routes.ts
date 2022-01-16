import { AddRouteProps } from '../types/interfaces';
import Route404 from './404.route';
import TipsRoute from './tips.route';

// Define routes
const routes: Omit<AddRouteProps, 'router'>[] = [
    {
        path: ['/tips/:pair'],
        handler: TipsRoute,
    }, 
    {
        path: '',
        handler: Route404,
    }, 
];

export default routes;