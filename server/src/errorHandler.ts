import { Request, Response, NextFunction } from "express";

const notFound = ((req: Request, res: Response, next: NextFunction) => {
    res.status(404);
    //passing to the next middleware - this time error handler
    next(new Error(`Not found - ${req.originalUrl}`));
});

const errors = ((error: { status?: number, message: string } = new Error('Unknown route'), req: Request, res: Response, next: NextFunction) => {
    //check if the error is comming from (un)known route, set status code accordingly
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json(error.message);
});

module.exports = {
    notFound,
    errors
};