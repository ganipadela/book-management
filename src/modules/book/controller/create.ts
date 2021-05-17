import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Book, BookCreationAttributes, BookInstance } from '../../../db/models/book';
import { pick } from 'lodash';
import httpStatus from 'http-status';

/**
 * Create a new book
 * @property {string} req.body.title - Title of the book.
 * @property {integer} req.body.numberOfPages - Number of pages of book.
 * @returns {Book}
 */
export const create: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: BookCreationAttributes = pick(req.body, ['title', 'numberOfPages', 'authorId']);

    const bookCreated: BookInstance = await Book.create(data);
    return res.status(httpStatus.OK).json({
      message: 'Book created successfully!',
      book: bookCreated,
      statusCode: httpStatus.OK,
    });
  } catch (exec) {
    console.error('ERROR > CREATE_BOOK > ', exec);
    return next(exec);
  }
}
