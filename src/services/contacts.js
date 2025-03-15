import Contact from '../db/models/contacts.js';  
import createError from 'http-errors';   

const createContact = async (contactData) => {  
    try {  
        return await Contact.create(contactData);  
    } catch (error) {  
        throw createError(400, 'Ошибка при создании контакта');  
    }  
};  

const getAllContacts = async ({ skip = 0, limit = 10, sortBy = 'name', sortOrder = 'asc' }) => {  
    try {  
        let order = sortOrder === 'desc' ? -1 : 1;  
        const sortField = ['name', 'email', 'phone'].includes(sortBy) ? sortBy : 'name';  

        return await Contact.find().skip(skip).limit(limit).sort({ [sortField]: order });  
    } catch (error) {  
        throw createError(500, 'Ошибка при получении контактов');  
    }  
};  

const countContacts = async () => {  
    try {  
        return await Contact.countDocuments();  
    } catch (error) {  
        throw createError(500, 'Ошибка при подсчете контактов');  
    }  
};  

const getContactById = async (contactId) => {  
    try {  
        const contact = await Contact.findById(contactId);  
        if (!contact) {  
            throw createError(404, 'Контакт не найден');  
        }  
        return contact;  
    } catch (error) {  
        throw createError(500, 'Ошибка при получении контакта');  
    }  
};  

const deleteContact = async (contactId) => {  
    try {  
        const contact = await Contact.findByIdAndDelete(contactId);  
        if (!contact) {  
            throw createError(404, 'Контакт не найден');  
        }  
        return contact;  
    } catch (error) {  
        throw createError(500, 'Ошибка при удалении контакта');  
    }  
};  

const updateContact = async (contactId, updates) => {  
    try {  
        const contact = await Contact.findByIdAndUpdate(contactId, updates, { new: true });  
        if (!contact) {  
            throw createError(404, 'Контакт не найден');  
        }  
        return contact;  
    } catch (error) {  
        throw createError(500, 'Ошибка при обновлении контакта');  
    }  
};  

export {  
    createContact,  
    getAllContacts,  
    countContacts,  
    getContactById,  
    deleteContact,  
    updateContact,  
};  