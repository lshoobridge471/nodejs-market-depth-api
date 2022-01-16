import { AddRouteProps } from '../types/interfaces';
import Route404 from './404.route';
import TipsRoute from './tips.route';
import DepthRoute from './depth.route';

// Define routes
const routes: Omit<AddRouteProps, 'router'>[] = [
    {
        path: ['/depth/:pair'],
        handler: DepthRoute,
    }, 
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