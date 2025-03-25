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

    // Логирование HTTP-запросов
    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );

    // Обработка CORS
    app.use(cors());

    // Обработка JSON-тел запросов
    app.use(express.json());

    // Обработчик ошибок парсинга JSON
    app.use((err, req, res, next) => {
      if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json({ status: 400, message: 'Invalid JSON syntax' });
      } else {
        next(err);
      }
    });

    // Подключение маршрутов
    app.use('/api', contactsRouter);

    // Обработчик для несуществующих маршрутов
    app.use(notFoundHandler);

    // Центральный обработчик ошибок
    app.use(errorHandler);

    // Запуск сервера
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during server setup:', error);
  }
}
