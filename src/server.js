import express from 'express';  
import mongoose from 'mongoose';  
import dotenv from 'dotenv';  
import cors from 'cors';  
import indexRouter from './routers/index.js'; 
import errorHandler from './middleWares/errorHandler.js';   
import notFoundHandler from './middleWares/notFoundHandler.js';  

dotenv.config();  

const setupServer = () => {  
    const app = express();  

    app.use(cors());  
    app.use(express.json());  

    app.use(indexRouter);  
    app.use(notFoundHandler);  
    app.use(errorHandler);  

    const PORT = process.env.PORT || 3000;  
    app.listen(PORT, () => {  
        console.log(`Сервер запущен на порту ${PORT}`);  
    });  

    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })  
        .then(() => console.log('Подключение к MongoDB успешное'))  
        .catch(err => console.error('Ошибка подключения к MongoDB:', err));  
};  

export default setupServer;  