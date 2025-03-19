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

export const getContactsController = async (req, res) => {  
  const { page, perPage } = parsePaginationParams(req.query);  
  const { sortOrder, sortBy } = parseSortParams(req.query);  

  const contacts = await getAllContacts({ page, perPage, sortOrder, sortBy });  

  res.json({  
    status: 200,  
    message: 'Successfully found contacts!',  
    data: contacts,  
  });  
};  

export const getContactByIdController = async (req, res, next) => {  
  const { contactId } = req.params;  

  try {  
    const contact = await getContactById(contactId);  

    if (contact === null) {  
      return next(createHttpError(404, `Contact with id: ${contactId} not found`));  
    }  
    
    res.status(200).send({  
      status: 200,  
      message: `Successfully found contact with id ${contactId}`,  
      data: contact,  
    });  
  } catch (error) {  
    next(createHttpError(500, 'Internal Server Error'));  
  }  
};  

export const createContactsController = async (req, res, next) => {  
  try {  
    const contact = await createContact(req.body);  

    res.status(201).json({  
      status: 201,  
      message: 'Successfully created a contact!',  
      data: contact,  
    });  
  } catch (error) {  
    next(createHttpError(500, 'Error creating contact'));  
  }  
};  

export const patchContactController = async (req, res, next) => {  
  const { contactId } = req.params;  

  try {  
    const result = await updateContact(contactId, req.body);  

    if (result === null) {  
      return next(createHttpError(404, 'Contact not found'));  
    }  

    res.json({  
      status: 200,  
      message: 'Successfully patched a contact!',  
      data: result,  
    });  
  } catch (error) {  
    next(createHttpError(500, 'Error updating contact'));  
  }  
};  

export const deleteContactController = async (req, res, next) => {  
  const { contactId } = req.params;  

  try {  
    const contact = await deleteContact(contactId);  

    if (contact === null) {  
      return next(createHttpError(404, 'Contact not found'));  
    }  

    res.status(204).json();  
  } catch (error) {  
    next(createHttpError(500, 'Error deleting contact'));  
  }  
};  