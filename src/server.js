import express, { json } from 'express';  
import mongoose from 'mongoose';  
import contactsRouter from './routers/contacts.js';  
import errorHandler from './middlewares/errorHandler.js';  
import notFoundHandler from './middlewares/notFoundHandler.js';  

const app = express();  

app.use(json());  
app.use('/contacts', contactsRouter);  
app.use(notFoundHandler);  
app.use(errorHandler);  

const setupServer = (port) => {  
    app.listen(port, () => {  
        console.log(`Сервер запущено на порту ${port}`);  
    });  
    return app;  
};  

export default setupServer;  