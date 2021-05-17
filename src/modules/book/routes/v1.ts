import { Router } from 'express';
import { body, check, oneOf, param } from 'express-validator';

import middlewares from '../../../middlewares';
import BookController from '../controller';

const bookControllerInstance: BookController = new BookController();
export const v1Routes = Router();

const paramValidation = {
  create: [
    body('title')
      .exists().withMessage('is required')
      .isString(),
    body('numberOfPages')
      .exists().withMessage('is required')
      .isInt().withMessage('should be a valid number'),
  ],
  getById: [
    param('id')
      .isInt().withMessage('should be a valid id'),
  ],
  update: [
    param('id')
      .isInt().withMessage('should be a valid id'),
    oneOf([
      check('title')
        .exists()
        .withMessage('is required'),
      check('numberOfPages')
        .exists()
        .withMessage('is required')
        .isInt().withMessage('should be a valid number'),
    ]),
  ],
  deleteById: [
    param('id')
      .isInt().withMessage('should be a valid id'),
  ],
};

/** GET /api/books/ - List of books for author */
v1Routes.route('/')
  .get(
    middlewares.isAuthenticated,
    middlewares.paginate,
    bookControllerInstance.list,
  );

/** POST /api/books/create - Create a book for author */
v1Routes.route('/')
  .post(
    middlewares.isAuthenticated,
    middlewares.validate(paramValidation.create),
    middlewares.setOwner(),
    bookControllerInstance.create,
  );

/** GET /api/books/:id - Get a book by id */
v1Routes.route('/:id')
  .get(
    middlewares.isAuthenticated,
    middlewares.validate(paramValidation.getById),
    bookControllerInstance.getById,
  );

/** PATCH /api/books/:id - Update a book by id */
v1Routes.route('/:id')
  .patch(
    middlewares.isAuthenticated,
    middlewares.validate(paramValidation.update),
    bookControllerInstance.update,
  );

/** DELETE /api/books/:id - Delete a book by id */
v1Routes.route('/:id')
  .delete(
    middlewares.isAuthenticated,
    middlewares.validate(paramValidation.deleteById),
    bookControllerInstance.deleteById,
  );

v1Routes.get('/', (req, res) => {
  res.status(200).send(`OK - ${req.baseUrl}`);
});
