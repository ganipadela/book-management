import { Request, Response, NextFunction } from 'express';
import APIError from '../lib/api-error';
import httpStatus from 'http-status';

const setOwner = (field = 'authorId') => async (req: Request, res: Response, next: NextFunction) => {
  if (!req.accessToken || !req.accessToken.data || !req.accessToken.data.id) {
    const err = new APIError('Unauthenticated', httpStatus.UNAUTHORIZED);
    return next(err);
  }

  req.body[field] = req.accessToken.data.id;

  next();
}

export default setOwner;
