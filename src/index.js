import { initMongoConnection } from './db/initMongoConnection.js';  
import setUpServer from './server.js';  

// Исправленное имя функции на bootstrap  
export const bootstrap = async () => {  
    await initMongoConnection();  
    const app = setUpServer();  

    const PORT = process.env.PORT || 3000;    
    app.listen(PORT, () => {  
        console.log(`Сервер запущен на порту ${PORT}`); 
    });  
};  

bootstrap();  