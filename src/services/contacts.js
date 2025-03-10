import Contact from '../db/models/contacts.js';  

const addContact = async (contactData) => {  
    try {  
        const newContact = new Contact(contactData);  
        await newContact.save();  
        return newContact;  
    } catch (error) {  
        console.error('Error adding contact:', error);  
        throw error;  
    }  
};  

const getAllContacts = async () => {  
    try {  
        return await Contact.find(); 
    } catch (error) {  
        console.error('Error getting contacts:', error);  
        throw error;  
    }  
};  

const getContactById = async (contactId) => {  
    try {  
        return await Contact.findById(contactId); 
    } catch (error) {  
        console.error('Error getting contact:', error);  
        throw error;  
    }  
};  

const deleteContact = async (contactId) => {  
    try {  
        const result = await Contact.findByIdAndDelete(contactId);  
        return result;  
    } catch (error) {  
        console.error('Error deleting contact:', error);  
        throw error;  
    }  
};  

export default {  
    addContact,  
    getAllContacts,  
    getContactById,  
    deleteContact,  
};  