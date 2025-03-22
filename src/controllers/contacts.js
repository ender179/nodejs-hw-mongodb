import {  
  createContact,  
  deleteContact,  
  getAllContacts,  
  getContactById,  
  updateContact,  
} from '../services/contacts.js';  
import createHttpError from 'http-errors';  
import { parsePaginationParams } from '../utils/parsePaginationParams.js';  
import { parseSortParams } from '../utils/parseSortParams.js';  

export const getContactsController = async (req, res, next) => {  
  const { page, perPage } = parsePaginationParams(req.query);  
  const { sortOrder, sortBy } = parseSortParams(req.query);  

  getAllContacts({ page, perPage, sortOrder, sortBy })  
    .then(contacts => {  
      res.json({  
        status: 200,  
        message: 'Successfully found contacts!',  
        data: contacts,  
      });  
    })  
    .catch(error => {  
      next(createHttpError(500, 'Something went wrong while fetching contacts'));  
    });  
};  

export const getContactByIdController = (req, res, next) => {  
  const { contactId } = req.params;  

  getContactById(contactId)  
    .then(contact => {  
      if (contact === null) {  
        return next(createHttpError(404, `Contact with id: ${contactId} not found`));  
      }  
      
      res.status(200).json({  
        status: 200,  
        message: `Successfully found contact with id ${contactId}`,  
        data: contact,  
      });  
    })  
    .catch(error => {  
      next(createHttpError(500, 'Something went wrong while fetching the contact'));  
    });  
};  

export const createContactsController = (req, res, next) => {  
  createContact(req.body)  
    .then(contact => {  
      res.status(201).json({  
        status: 201,  
        message: 'Successfully created a contact!',  
        data: contact,  
      });  
    })  
    .catch(error => {  
      next(createHttpError(500, 'Something went wrong while creating the contact'));  
    });  
};  

export const patchContactController = (req, res, next) => {  
  const { contactId } = req.params;  

  updateContact(contactId, req.body)  
    .then(result => {  
      if (result === null) {  
        return next(createHttpError(404, 'Contact not found'));  
      }  

      res.json({  
        status: 200,  
        message: 'Successfully patched a contact!',  
        data: result,  
      });  
    })  
    .catch(error => {  
      next(createHttpError(500, 'Something went wrong while updating the contact'));  
    });  
};  

export const deleteContactController = (req, res, next) => {  
  const { contactId } = req.params;  

  deleteContact(contactId)  
    .then(contact => {  
      if (contact === null) {  
        return next(createHttpError(404, 'Contact not found'));  
      }  

      res.status(204).json();  
    })  
    .catch(error => {  
      next(createHttpError(500, 'Something went wrong while deleting the contact'));  
    });  
};  