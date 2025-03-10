import updateContactService from "../services/contacts.js";  
import createError from "http-errors";  

const updateContact = async (req, res, next) => {  
    const { contactId } = req.params;  
    try {  
        const updatedContact = await updateContactService.updateContact(contactId, req.body);  

        if (!updatedContact) {  
            throw createError(404, "Contact not found");  
        }  

        res.status(200).json({  
            status: 200,  
            message: "Successfully patched a contact!",  
            data: updatedContact,  
        });  
    } catch (error) {  
        next(error);  
    }  
};  

export default {  
    updateContact,  
};  