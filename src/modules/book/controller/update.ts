import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Book, BookInstance, BookUpdationAttributes } from '../../../db/models/book';
import { pick } from 'lodash';
import httpStatus from 'http-status';
import BookService from '../service';
import APIError from '../../../lib/api-error';

/**
 * Update book with id
 * @property {string} req.params.id - Id of the book.
 * @property {string} req.body.title - Title of the book.
 * @property {integer} req.body.numberOfPages - Number of pages of book.
 * @returns {Book}
 */
export const update: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookId = req.params.id;
    const data: BookUpdationAttributes = pick(req.body, ['title', 'numberOfPages']);
    const bookServiceInstance = new BookService();

    const existingBook: BookInstance | null = await bookServiceInstance.getById(bookId);
    if (!existingBook) {
      return next(new APIError(`Book with id - ${bookId} not found!`, httpStatus.NOT_FOUND));
    }

    /** Check ownership of book */
    if (existingBook.authorId != req.accessToken?.data.id) {
      return next(new APIError(`Unauthorized!`, httpStatus.UNAUTHORIZED));
    }

    existingBook.title = data.title || existingBook.title;
    existingBook.numberOfPages = data.numberOfPages || existingBook.numberOfPages;

    const updatedBook = await existingBook.save();

    return res.status(httpStatus.OK).json({
      message: 'Book updated successfully!',
      book: updatedBook,
      statusCode: httpStatus.OK,
    });
  } catch (exec) {
    console.error('ERROR > UPDATE_BOOK > ', exec);
    return next(exec);
  }
}
