import {
    createExpressApp,
    addAppRoute,
} from "./express";
import Route404 from "../routes/404.route";
import express, { Express, Router } from 'express';

describe('express test suite', () => {
    it('test createExpressApp', () => {
        const router: Router = Router();
        const app: Express = createExpressApp(router);
        const mockApp: Express = express();

        mockApp.use(router);
        // Parse string
        const routerStackApp: string = JSON.stringify(app._router.stack);
        const routerStackMockApp: string = JSON.stringify(mockApp._router.stack);
        // Test
        expect(routerStackApp).toStrictEqual(routerStackMockApp);
    });

    it('test addAppRoute', () => {
        const router = Router();
        const app: Express = createExpressApp(router);
        addAppRoute(app, '/404', Route404);
        // Check last item added
        const lastItem = app._router.stack.slice(-1).pop();
        expect(lastItem.name).toEqual(Route404.name);
    });
});