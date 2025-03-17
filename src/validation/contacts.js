import Joi from 'joi';  

export const createContactsSchema = Joi.object({  
  name: Joi.string().min(1).required(),  
  email: Joi.string().email().required(),  
  phone: Joi.string().required(),  
});  

export const updateContactsSchema = Joi.object({  
  name: Joi.string().min(1),  
  email: Joi.string().email(),  
  phone: Joi.string(),  
});  