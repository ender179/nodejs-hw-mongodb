import express, { json } from 'express';  
import cors from 'cors';  
const pino = require('pino')();  
import contactsRouter from './routes/contacts';  

const setupServer = () => {  
  const app = express();  
  app.use(cors());  
  app.use(json());  
  
  app.use((req, res, next) => {  
    pino.info(`${req.method} ${req.url}`);  
    next();  
  });  

  app.use('/contacts', contactsRouter);  

  app.use((req, res) => {  
    res.status(404).json({ message: 'Not found' });  
  });  

  const PORT = process.env.PORT || 3000;  
  app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);  
  });  
};  

export default setupServer;