import { Router } from 'express';
import { AuthRoutes } from '../modules/auth';
import { AuthorRoutes } from '../modules/author';
import { BookRoutes } from '../modules/book';

export const v1Routes = Router();

v1Routes.use('/auth', AuthRoutes.v1Routes);
v1Routes.use('/authors', AuthorRoutes.v1Routes);
v1Routes.use('/books', BookRoutes.v1Routes);

v1Routes.get('/', (req, res) => {
  res.status(200).send(`OK - ${req.baseUrl}`);
});
