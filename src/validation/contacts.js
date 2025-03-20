import Joi from 'joi';  

// Схема валідації для створення контакту  
export const createContactsSchema = Joi.object({  
    name: Joi.string().min(1).required(),  
    phoneNumber: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),  
    email: Joi.string().email().required(),  
    isFavourite: Joi.boolean().default(false),  // Додаємо isFavourite  
    contactType: Joi.string().valid('personal', 'professional').required()  // Додаємо contactType  
});  

// Схема валідації для оновлення контакту  
export const updateContactsSchema = Joi.object({  
    name: Joi.string().min(1),  
    phoneNumber: Joi.string().pattern(/^[0-9]+$/).min(10).max(15),  
    email: Joi.string().email(),  
    isFavourite: Joi.boolean(),  // Додаємо isFavourite  
    contactType: Joi.string().valid('personal', 'professional')  // Додаємо contactType  
});  