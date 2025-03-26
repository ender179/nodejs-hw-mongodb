import Joi from 'joi';  

export const createContactsSchema = Joi.object({  
  name: Joi.string().min(1).required(),  
  phoneNumber: Joi.string().pattern(/^[0-9]+$/).min(10).max(15).required(),  
  email: Joi.string().email().required(),  
  isFavourite: Joi.boolean().default(false),  
  contactType: Joi.string().valid('work', 'home', 'personal').required(),   
});  

export const updateContactsSchema = Joi.object({  
  name: Joi.string().min(1),  
  phoneNumber: Joi.string().pattern(/^[0-9]+$/).min(10).max(15),  
  email: Joi.string().email(),  
  isFavourite: Joi.boolean(),  
  contactType: Joi.string().valid('work', 'home', 'personal'),   
});  