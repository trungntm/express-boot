import express, { RequestHandler, Request, Response } from 'express';

const catchAsync =
  (fn: RequestHandler) => (req: Request, res: Response, next: express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(err => next(err));
  };

export { catchAsync };
