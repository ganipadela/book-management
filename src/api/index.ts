import { Router } from 'express'
import { v1Routes } from './v1';
import middlewares from '../middlewares';

export const apiRoutes = Router();

apiRoutes.get('/', (req, res) => {
  res.status(200).send(`OK - ${req.url}`);
});

apiRoutes.use('/', middlewares.authentication);
apiRoutes.use('/v1', v1Routes);
