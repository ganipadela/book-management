import { Router } from 'express';
import { body } from 'express-validator';

import middlewares from '../../../middlewares';
import AuthController from '../controller';

const authControllerInstance: AuthController = new AuthController();
export const v1Routes = Router();

const paramValidation = {
  register: [
    body('email')
      .exists().withMessage('is required')
      .isEmail().withMessage('must be of type email'),
    body('password')
      .exists().withMessage('is required')
      .isString().isLength({ min: 8 }).withMessage('must be minimum 8 char long'),
    body('firstName')
      .exists().withMessage('is required')
      .isString(),
    body('lastName').optional().isString(),
  ],
  login: [
    body('email')
      .exists().withMessage('is required')
      .isEmail().withMessage('must be of type email'),
    body('password')
      .exists().withMessage('is required'),
  ],
};

/** POST /api/auth/login - Returns token if correct username and password is provided */
v1Routes.route('/login')
  .post(middlewares.validate(paramValidation.login), authControllerInstance.login);

/** POST /api/auth/register - Register a new user */
v1Routes.route('/register')
  .post(middlewares.validate(paramValidation.register), authControllerInstance.register);

v1Routes.get('/', (req, res) => {
  res.status(200).send(`OK - ${req.baseUrl}`);
});
