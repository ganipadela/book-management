import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import APIError from '../lib/api-error';
import httpStatus from 'http-status';

const authentication = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.get('Authorization') || req.get('authorization');
  if (!token) {
    req['isAuthenticated'] = false;
    return next();
  }
  if (typeof token == 'string') {
    token = token.replace('Bearer ', '');
  }

  try {
    let decoded = jwt.verify(token, config.jwtSecret);
    req['accessToken'] = {
      token,
      data: decoded || {},
    };
    req['isAuthenticated'] = true;
    next();
  } catch (exec) {
    let message = 'Unauthorized!';
    if (exec.message && exec.message.indexOf('expired') > -1) {
      message = 'Your session has expired. Please login again!'
    }
    console.error('INVALID TOKEN > ', exec);
    const err = new APIError(message, httpStatus.UNAUTHORIZED);
    return next(err);
  }
}

export default authentication;
