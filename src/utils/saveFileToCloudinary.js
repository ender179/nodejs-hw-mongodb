import cloudinary from 'cloudinary';  
import fs from 'node:fs/promises';  
import { getEnvVar } from './getEnvVar.js';  
import { CLOUDINARY } from '../constants/index.js';  

cloudinary.v2.config({  
  secure: true,  
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),  
  api_key: getEnvVar(CLOUDINARY.API_KEY),  
  api_secret: getEnvVar(CLOUDINARY.API_SECRET),  
});  

console.log('Cloud Name:', getEnvVar(CLOUDINARY.CLOUD_NAME));  
console.log('API Key:', getEnvVar(CLOUDINARY.API_KEY));  
console.log('API Secret:', getEnvVar(CLOUDINARY.API_SECRET));  

export const saveFileToCloudinary = async (file) => {  
  try {  
    const response = await cloudinary.v2.uploader.upload(file.path);  
    
    await fs.unlink(file.path).catch(err => console.error('File unlink error:', err));  
    
    return response.secure_url;  
  } catch (error) {  
    console.error('Error uploading to Cloudinary:', error);  
    throw new Error('Failed to upload file');  
  }  
};  