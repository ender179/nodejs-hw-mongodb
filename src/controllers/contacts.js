import * as contactService from '../services/contacts.js';  
import createError from 'http-errors';  

const createContact = async (req, res, next) => {  
    try {  
        const newContact = {  
            ...req.body,  
            createdAt: Date.now(),  
            updatedAt: Date.now(),  
        };  

        const contact = await contactService.createContact(newContact);  
        res.status(201).json({  
            status: 201,  
            data: contact,  
        });  
    } catch (error) {  
        next(createError(400, 'Ошибка при создании контакта'));  
    }  
};  

const getAllContacts = async (req, res, next) => {  
    try {  
        const { page = 1, perPage = 10, sortBy = 'name', sortOrder = 'asc' } = req.query;  
        const skip = (page - 1) * perPage;  
        const limit = parseInt(perPage);  

        const options = {  
            skip,  
            limit,  
            sort: sortBy ? { [sortBy]: sortOrder === 'desc' ? -1 : 1 } : {},  
        };  

        const contacts = await contactService.getAllContacts(options);  
        const totalContacts = await contactService.countContacts();  

        res.status(200).json({  
            status: 200,  
            message: 'Успешно найдены контакты!',  
            data: {  
                contacts,  
                page: parseInt(page),  
                perPage: limit,  
                totalItems: totalContacts,  
                totalPages: Math.ceil(totalContacts / limit),  
                hasPreviousPage: page > 1,  
                hasNextPage: page < Math.ceil(totalContacts / limit),  
            },  
        });  
    } catch (error) {  
        next(createError(500, 'Ошибка при получении контактов'));  
    }  
};  

const updateContact = async (req, res, next) => {  
    const { contactId } = req.params;  
    const updates = {  
        ...req.body,  
        updatedAt: Date.now(),  
    };  

    try {  
        const updatedContact = await contactService.updateContact(contactId, updates);  
        if (!updatedContact) {  
            return next(createError(404, 'Контакт не найден'));  
        }  

        res.status(200).json({  
            status: 200,  
            message: 'Контакт успешно обновлён!',  
            data: updatedContact,  
        });  
    } catch (error) {  
        next(createError(500, 'Ошибка при обновлении контакта'));  
    }  
};  

const deleteContact = async (req, res, next) => {  
    const { contactId } = req.params;  

    try {  
        const deletedContact = await contactService.deleteContact(contactId);  
        if (!deletedContact) {  
            return next(createError(404, 'Контакт не найден'));  
        }  

        res.status(200).json({  
            status: 200,  
            message: 'Контакт успешно удалён!',  
            data: deletedContact,  
        });  
    } catch (error) {  
        next(createError(500, 'Ошибка при удалении контакта'));  
    }  
};  

export {  
    createContact,  
    getAllContacts,  
    updateContact,  
    deleteContact,  
};  