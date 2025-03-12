import Contact from '../db/models/contacts.js';   

const createContact = async (contactData) => {  
    const newContact = new Contact(contactData);  
    await newContact.save();  
    return newContact;  
};  

const getAllContacts = async () => {  
    const contacts = await Contact.find();  
    return contacts;  
};  

const getContactById = async (contactId) => {  
    const contact = await Contact.findById(contactId);  
    return contact;  
};  

const deleteContact = async (contactId) => {  
    const result = await Contact.findByIdAndDelete(contactId);   
    return result;  
};  

const updateContact = async (contactId, updates) => {  
    return await Contact.findByIdAndUpdate(contactId, updates, { new: true });  
};  

export default {  
    createContact,  
    getAllContacts,  
    getContactById,  
    deleteContact,  
    updateContact,   
};  