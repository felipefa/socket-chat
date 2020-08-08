import 'dotenv/config';
import cors from 'cors';
import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from './errors/AppError';

import routes from './routes';

class App {
  public readonly server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  /**
   * Apply middlewares to the server.
   */
  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  /**
   * Apply routes to the server and handle routes errors.
   */
  routes() {
    this.server.disable('x-powered-by');

    this.server.use('/', routes);

    this.server.use(() => {
      throw new AppError(`Oops, this route doesn't exist.`, 404);
    });

    this.server.use(
      (error: Error, _: Request, response: Response, __: NextFunction) => {
        const status = 'ERROR';

        if (error instanceof AppError) {
          return response.status(error.statusCode).json({
            message: error.message,
            status,
          });
        }

        console.error(error);

        return response.status(500).json({
          message: 'Internal server error.',
          status,
        });
      },
    );
  }
}

export default new App().server;
