import { find, findById } from '../models/contact';  

const getAllContacts = async () => {  
  return await find();  
};  

const getContactById = async (id) => {  
  return await findById(id);  
};  

export default {  
  getAllContacts,  
  getContactById,  
};