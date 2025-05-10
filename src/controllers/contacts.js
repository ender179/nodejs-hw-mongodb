import contactService from '../services/contacts.js';   
import createError from 'http-errors';   

const createContact = async (req, res, next) => {  
    const newContact = await contactService.createContact(req.body);  
    res.status(201).json({  
        status: 201,  
        data: newContact,  
    });  
};  

const getAllContacts = async (req, res, next) => {  
    const contacts = await contactService.getAllContacts();   
    res.status(200).json({  
        status: 200,  
        data: contacts,  
    });  
};  

const getContactById = async (req, res, next) => {  
    const { contactId } = req.params;  
    const contact = await contactService.getContactById(contactId);   

    if (!contact) {  
        return next(createError(404, "Contact not found"));  
    }  
    res.status(200).json({  
        status: 200,  
        data: contact,  
    });  
};  

const deleteContact = async (req, res, next) => {  
    const { contactId } = req.params;  
    const deletedContact = await contactService.deleteContact(contactId);   

    if (!deletedContact) {  
        return next(createError(404, "Contact not found"));  
    }  
    res.status(204).send();   
};  

const updateContact = async (req, res, next) => {  
    const { contactId } = req.params;  
    const updates = req.body;   

    const updatedContact = await contactService.updateContact(contactId, updates);   

    if (!updatedContact) {  
        return next(createError(404, "Contact not found"));   
    }  
    res.status(200).json({  
        data: updatedContact,  
    });  
};  

export default {  
    createContact,  
    getAllContacts,  
    getContactById,  
    deleteContact,  
    updateContact,   
};  