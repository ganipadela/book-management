import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Author, AuthorInstance } from '../../../db/models/author';
import { AuthorService } from '../../author';
import { pick } from 'lodash';
import APIError from '../../../lib/api-error';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../../config';

/**
 * Returns jwt token and author details if valid email and password are provided
 * @property {string} req.body.email - The email of author.
 * @property {string} req.body.password - The password of author.
 * @returns {token, Author}
 */
export const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = pick(req.body, ['email', 'password']);
    const authorServiceInstance = new AuthorService();
    const existingAuthor: AuthorInstance | null = await authorServiceInstance.getByEmail(data.email);
    if (!existingAuthor) {
      return next(new APIError(`Author with email - ${data.email} not found!`, httpStatus.NOT_FOUND));
    }

    if (!Author.comparePassword(existingAuthor.password, data.password)) {
      const err = new APIError('User email and password combination do not match', httpStatus.UNAUTHORIZED);
      return next(err);
    }

    const authorData = pick(existingAuthor, ['id']);
    const token = jwt.sign(authorData, config.jwtSecret, {});

    return res.status(httpStatus.OK).json({
      token,
      author: pick(existingAuthor, ['id', 'email', 'firstName', 'lastName']),
    });
  } catch (exec) {
    console.error('ERROR > LOGIN > ', exec);
    return next(exec);
  }
}
