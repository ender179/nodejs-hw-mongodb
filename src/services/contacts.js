import { create } from "./models/contacts.js";   

const createContact = async (data) => {  
  const newContact = await create(data);  
  return newContact;  
};  

export default {  
  createContact,  
};  