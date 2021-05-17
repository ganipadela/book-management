import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Book, BookInstance } from '../../../db/models/book';
import httpStatus from 'http-status';
import BookService from '../service';
import APIError from '../../../lib/api-error';

/**
 * Get book with id
 * @property {string} req.params.id - Id of the book.
 * @returns {Book}
 */
export const getById: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.id;
    const bookServiceInstance = new BookService();

    const existingBook: BookInstance | null = await bookServiceInstance.getById(bookId);
    if (!existingBook) {
      return next(new APIError(`Book with id - ${bookId} not found!`, httpStatus.NOT_FOUND));
    }

    /** Check ownership of book */
    if (existingBook.authorId != req.accessToken?.data.id) {
      return next(new APIError(`Unauthorized!`, httpStatus.UNAUTHORIZED));
    }

    return res.status(httpStatus.OK).json(existingBook);
  } catch (exec) {
    console.error('ERROR > GET_BY_ID > ', exec);
    return next(exec);
  }
}
