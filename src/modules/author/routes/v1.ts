import { Router } from 'express';

export const v1Routes = Router();

v1Routes.get('/', (req, res) => {
  res.status(200).send(`OK - ${req.baseUrl}`);
});
