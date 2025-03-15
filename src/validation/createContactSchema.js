import Joi from 'joi';  

const createContactSchema = Joi.object({  
    name: Joi.string().required(),  
    email: Joi.string().email(),  
    phone: Joi.string().required(),  
    isFavourite: Joi.boolean(),  
    contactType: Joi.string().required(),  
});  

export default createContactSchema;  