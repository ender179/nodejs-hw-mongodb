import dotenv from 'dotenv';  
import mongoose from 'mongoose';  
import { getEnvVar } from '../utils/getEnvVar.js';  

dotenv.config();  

export const initMongoConnection = async () => {  
    try {  
        const mongoURI = getEnvVar('MONGODB_URI');  
        await mongoose.connect(mongoURI); 
        console.log("MongoDB connection successfully established!");  
    } catch (error) {  
        console.error("Error connecting to MongoDB:", error.message);  
        process.exit(1);  
    }  
};  