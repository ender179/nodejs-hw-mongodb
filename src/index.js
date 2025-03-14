import { initMongoConnection } from './db/initMongoConnection.js';  
import setupServer from './server.js';  

export const bootstrap = async () => {  
  await initMongoConnection();  
  const app = setupServer();  
  
  const PORT = process.env.PORT || 3000;  
  app.listen(PORT, () => {  
    console.log(`Сервер запущено на порту ${PORT}`);  
  });  
};  

bootstrap();  