import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import httpStatus from 'http-status';
import APIError from '../lib/api-error';

const validate = (validations: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break;
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return next(new APIError(`${errors.array()[0].param} - ${errors.array()[0].msg}`, httpStatus.BAD_REQUEST));
  };
};

export default validate;
