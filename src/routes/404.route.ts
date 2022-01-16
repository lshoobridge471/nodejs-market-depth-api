import { Request, Response } from 'express';

const Route404 = async (_: Request, res: Response): Promise<void> => {
    res.status(404);
    res.send({ message: 'URL not found!' });
};

export default Route404;