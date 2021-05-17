import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Book, BookInstance } from '../../../db/models/book';
import httpStatus from 'http-status';
import BookService from '../service';
import APIError from '../../../lib/api-error';

/**
 * Get books by author
 * @property {skip} req.query.skip - Skip.
 * @property {limit} req.query.limit - Limit.
 * @returns {count, data: Array<Book>}
 */
export const list: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let filter = {
      where: {
        authorId: req.accessToken?.data.id
      },
      ...req.paginateFilter,
    }
    const resp = await Book.findAndCountAll(filter);
    return res.status(httpStatus.OK).json({
      count: resp.count,
      data: resp.rows,
    });
  } catch (exec) {
    console.error('ERROR > LIST > ', exec);
    return next(exec);
  }
}
