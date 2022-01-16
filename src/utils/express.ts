import { AddRouteProps } from "../types/interfaces";
import express, { Express, Router, Handler } from 'express';

// Function to add route to Router.
export const addRoute = (addRouteProps: AddRouteProps): void => {
    const { router, path, handler } = addRouteProps;
    router.use(path, handler);
};

// Create Express App Route function.
export const addAppRoute = (app: Express, path: string | string[], handler: Handler): Express => {
    app._router.use(path, handler);
    return app;
};

// Create Express App
export const createExpressApp = (router: Router): Express => {
    const app: Express = express();
    app.use(router);
    return app;
};