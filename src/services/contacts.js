import { create } from "../models/contact"; // Припустимо, що у вас є модель Contact  

const createContact = async (data) => {  
  const newContact = await create(data);  
  return newContact;  
};  

export default {  
  createContact,  
};  