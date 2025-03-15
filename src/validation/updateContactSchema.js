import { object, string } from 'joi';  

const updateContactSchema = object({  
  name: string().optional(),  
  email: string().email().optional(),  
  phone: string().optional(),  
}).min(1);

export default updateContactSchema;  