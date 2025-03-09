import { updateContact as updateContactService } from "../services/contacts.js";  
import createError from "http-errors";  

const updateContact = async (req, res, next) => {  
  const { contactId } = req.params;  
  const updatedContact = await updateContactService(contactId, req.body);  

  if (!updatedContact) {  
    throw createError(404, "Contact not found");  
  }  

  res.status(200).json({  
    status: 200,  
    message: "Successfully patched a contact!",  
    data: updatedContact,  
  });  
};  

export default {  
  updateContact,  
};  