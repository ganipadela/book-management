import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Author, AuthorCreationAttributes, AuthorInstance } from '../../../db/models/author';
import AuthorService from '../../author/service';
import { pick } from 'lodash';
import APIError from '../../../lib/api-error';
import httpStatus from 'http-status';

/**
 * Register a new user
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @property {string} req.body.firstName - The firstName of user.
 * @property {string} req.body.lastName - The lastName of user.
 * @returns {}
 */
export const register: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: AuthorCreationAttributes = pick(req.body, ['email', 'password', 'firstName', 'lastName']);
    const authorServiceInstance = new AuthorService();
    const existingUser: AuthorInstance | null = await authorServiceInstance.getByEmail(data.email);
    if (existingUser) {
      return next(new APIError(`Author with email - ${data.email} already exists!`, httpStatus.CONFLICT));
    }
    const authorCreated: AuthorInstance = await Author.create(data);
    return res.status(httpStatus.OK).json({
      message: 'Account registered successfully!',
      status: true,
      statusCode: httpStatus.OK,
    });
  } catch (exec) {
    console.error('ERROR > REGISTER > ', exec);
    return next(exec);
  }
}
