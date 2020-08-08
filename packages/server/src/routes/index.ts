import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ data: null, message: 'Server running.', status: 'OK' }),
);

export default routes;
