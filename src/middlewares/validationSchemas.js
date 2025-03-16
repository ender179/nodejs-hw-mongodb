import Joi from 'joi';  

const contactSchema = Joi.object({  
  name: Joi.string().required(),  
  phoneNumber: Joi.string().required(), // Виправлено відповідно до вимог  
  email: Joi.string().email().required(),  
});  

export { contactSchema };  