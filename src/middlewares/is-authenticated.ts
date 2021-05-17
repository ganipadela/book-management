import { Request, Response, NextFunction } from 'express';
import APIError from '../lib/api-error';
import httpStatus from 'http-status';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated) {
    return next();
  }
  const err = new APIError('Unauthenticated', httpStatus.UNAUTHORIZED);
  return next(err);
}

export default isAuthenticated;
