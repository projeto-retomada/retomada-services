import { NextFunction } from "express";
import HttpException from "./HttpException";
import { Response, Request } from 'express';

function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    const detail = error.detail || 'No details';
    response.status(status).send({status, message, detail});
}

export default errorMiddleware;