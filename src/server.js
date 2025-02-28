import express from 'express';  
import cors from 'cors';  
import { pinoHttp } from 'pino-http';  
import { getEnvVar } from './utils/getEnvVar.js';  
import { getAllContacts, getContactById } from './services/contacts.js';  

const PORT = Number(getEnvVar('PORT', '3000'));  

const setUpServer = () => {  
  const app = express();  

  app.use(express.json());  
  app.use(cors());  
  app.use(  
    pinoHttp({  
      transport: {  
        target: 'pino-pretty',  
      },  
    }),  
  );  

  app.get('/', (req, res) => {  
    res.json({ message: 'Hello Mentor' });  
  });  

  app.get('/contacts', async (req, res) => {  
    try {  
      const contacts = await getAllContacts();  
      res.status(200).json({  
        status: 200,  
        message: 'Успешно найдены контакты',  
        data: contacts,  
      });  
    } catch (error) {  
      console.error('Ошибка при получении контактов:', error);  
      res.status(500).json({  
        status: 500,  
        message: 'Не удалось получить контакты',  
      });  
    }  
  });  

  app.get('/contacts/:contactId', async (req, res) => {  
    try {  
      const { contactId } = req.params;  
      console.log('Получен contactId:', contactId);  

      const contact = await getContactById(contactId);  

      if (!contact) {  
        return res.status(404).json({  
          status: 404,  
          message: 'Контакт не найден',  
        });  
      }  

      res.status(200).json({  
        status: 200,  
        message: `Успешно найден контакт с id ${contactId}`,  
        data: contact,  
      });  
    } catch (error) {  
      console.error('Ошибка при получении контакта по ID:', error);  
      res.status(500).json({  
        status: 500,  
        message: 'Не удалось получить контакт',  
      });  
    }  
  });  

  app.get('*', (req, res) => {  
    res.status(404).json({  
      status: 404,  
      message: 'Опс, маршрут не найден',  
    });  
  });  

  app.use((err, req, res, next) => {  
    console.error('Внутренняя ошибка сервера:', err);  
    res.status(500).json({  
      status: 500,  
      message: 'Что-то пошло не так',  
      error: err.message,  
    });  
  });  

  app.listen(PORT, () => {  
    console.log(`Сервер запущен на порту ${PORT}`);  
  });  
};  

export default setUpServer;  