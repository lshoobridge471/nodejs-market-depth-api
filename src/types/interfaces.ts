import { Router, Handler } from "express";

export interface Environment {
    NODE_ENV: string;
    SERVER_HOST: string;
    SERVER_PORT: string;
    BITFINEX_API: string;
    VALID_PAIRS: string;
}

export interface AddRouteProps {
    router: Router;
    path: string | string[];
    handler: Handler;
}

export interface Tip {
    price: number;
    amount: number;
    type: string;
}