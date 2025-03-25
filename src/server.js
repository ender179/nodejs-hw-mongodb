import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export async function setupServer() {
  try {
    const app = express();

    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );

    app.use(cors());

    app.use(express.json());

    app.use((err, req, res, next) => {
      if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json({ status: 400, message: 'Invalid JSON syntax' });
      } else {
        next(err);
      }
    });

    app.use('/api', contactsRouter);

    app.use(express.json());

    app.use((err, req, res, next) => {
      if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json({ status: 400, message: 'Invalid JSON syntax' });
      } else {
        next(err);
      }
    });

    app.use('/api', contactsRouter);

    app.use(notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during server setup:', error);
  }
}