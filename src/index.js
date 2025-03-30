import { initMongoConnection } from './db/initMongoConnection.js'; // Путь к вашему файлу может отличаться  
import setupServer from './server.js';  

const bootstrap = async () => {  
    try {  
        await initMongoConnection();  
        setupServer();  
    } catch (error) {  
        console.error('Ошибка при инициализации приложения:', error);  
    }  
};  

bootstrap();  