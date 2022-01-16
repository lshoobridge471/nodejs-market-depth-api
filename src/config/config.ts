import dotenv from 'dotenv';
import { Environment } from '../types/interfaces';

// Initialize the dotenv CONFIG (parse environment variables in process.env).
dotenv.config();

const {
    NODE_ENV = 'development',
    SERVER_HOST = 'localhost',
    SERVER_PORT = '8080'
} = process.env;

const CONFIG: Environment = {
    NODE_ENV,
    SERVER_HOST,
    SERVER_PORT,
};

export default CONFIG;