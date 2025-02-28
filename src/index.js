import setupServer from './server';  
import initMongoConnection from './db/initMongoConnection';  

const startApp = async () => {  
  await initMongoConnection();  
  const app = setupServer();     
  const PORT = process.env.PORT || 3000;  

  app.listen(PORT, () => {  
    console.log(`Сервер запущен на порту ${PORT}`);  
  });  
};  

startApp();  