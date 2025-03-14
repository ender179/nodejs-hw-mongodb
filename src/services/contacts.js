import Contact from '../db/models/contacts.js';  

const createContact = async (contactData) => {  
    return await Contact.create(contactData);  
};  

const getAllContacts = async ({ skip, limit, sortBy, sortOrder }) => {  
    const validSortFields = ['name', 'email', 'phone'];   
    let order = 1;   

    if (sortOrder === 'desc') {  
        order = -1;   
    }  

    const sortField = validSortFields.includes(sortBy) ? sortBy : 'name';  

    return await Contact.find().skip(skip).limit(limit).sort({ [sortField]: order });  
};  

const countContacts = async () => {  
    return await Contact.countDocuments();  
};  

const getContactById = async (contactId) => {  
    return await Contact.findById(contactId);  
};  

const deleteContact = async (contactId) => {  
    return await Contact.findByIdAndDelete(contactId);  
};  

const updateContact = async (contactId, updates) => {  
    return await Contact.findByIdAndUpdate(contactId, updates, { new: true });  
};  

export default {  
    createContact,  
    getAllContacts,  
    countContacts,  
    getContactById,  
    deleteContact,  
    updateContact,  
};  