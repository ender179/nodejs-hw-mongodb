import express from 'express';  
import mongoose from 'mongoose';  
import cors from 'cors';  
import { config } from 'dotenv';  
import routes from './routers/index.js';  
import notFoundHandler from './middleWares/notFoundHandler.js';  
import errorHandler from './middleWares/errorHandler.js';  

config();  

const setupServer = () => {  
    const app = express();  
    app.use(cors());  
    app.use(express.json());  
    app.use(routes);  
    app.use(notFoundHandler);  
    app.use(errorHandler);  

    const PORT = process.env.PORT || 3000;  

    app.listen(PORT, () => {  
        console.log(`Сервер запущен на порту ${PORT}`);  
    });  
};  

export default setupServer; // Экспорт по умолчанию  