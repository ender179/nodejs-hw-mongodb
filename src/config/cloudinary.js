import { v2 as cloudinary } from 'cloudinary';  

cloudinary.config({  
    cloud_name: '<ваше_имя_облака>',  
    api_key: '<ваш_api_key>',  
    api_secret: '<ваш_api_secret>',  
});  

export default cloudinary;  