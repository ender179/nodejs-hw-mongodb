import { create } from "../models/contact.js";   

const createContact = async (data) => {  
  const newContact = await create(data);  
  return newContact;  
};  

export default {  
  createContact,  
};  