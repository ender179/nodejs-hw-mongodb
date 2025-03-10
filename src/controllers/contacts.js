import contactService from "../services/contacts.js";  
import createError from "http-errors";  

const getAllContacts = async (req, res, next) => {  
    try {  
        const contacts = await contactService.getAllContacts();  
        res.status(200).json({  
            status: 200,  
            data: contacts,  
        });  
    } catch (error) {  
        next(error);  
    }  
};  

const getContactById = async (req, res, next) => {  
    const { contactId } = req.params;  
    try {  
        const contact = await contactService.getContactById(contactId);  
        if (!contact) {  
            throw createError(404, "Contact not found");  
        }  
        res.status(200).json({  
            status: 200,  
            data: contact,  
        });  
    } catch (error) {  
        next(error);  
    }  
};  

const createContact = async (req, res, next) => {  
    try {  
        const newContact = await contactService.createContact(req.body);  
        res.status(201).json({  
            status: 201,  
            data: newContact,  
        });  
    } catch (error) {  
        next(error);  
    }  
};  

const deleteContact = async (req, res, next) => {  
    const { contactId } = req.params;  
    try {  
        const deletedContact = await contactService.deleteContact(contactId);  
        if (!deletedContact) {  
            throw createError(404, "Contact not found");  
        }  
        res.status(200).json({  
            status: 200,  
            message: "Contact deleted successfully",  
        });  
    } catch (error) {  
        next(error);  
    }  
};  

export default {  
    getAllContacts,  
    getContactById,  
    createContact,  
    deleteContact,  
};  