import express from 'express';  
import mongoose from 'mongoose';  
import cors from 'cors';  
import { config } from 'dotenv';  
import routes from './routers/index.js';  
import notFoundHandler from './middlewares/notFoundHandler.js';  
import errorHandler from './middlewares/errorHandler.js';  

config(); 

const app = express();  

app.use(cors());  
app.use(express.json());  
app.use(routes); 

app.use(notFoundHandler);   
app.use(errorHandler);  

const PORT = process.env.PORT || 3000;  

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })  
    .then(() => {  
        app.listen(PORT, () => {  
            console.log(`Сервер запущен на порту ${PORT}`);  
        });  
    })  
    .catch(err => console.error(err));  