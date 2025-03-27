import {  
  createContact,  
  deleteContact as serviceDeleteContact,  
  getAllContacts,  
  getContactById,  
  updateContact,  
} from '../services/contacts.js';  
import createHttpError from 'http-errors';  
import { parsePaginationParams } from '../utils/parsePaginationParams.js';  
import { parseSortParams } from '../utils/parseSortParams.js';  
import { ctrlWrapper } from '../utils/ctrlWrapper.js';  

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

export const getContactByIdController = async (req, res) => {  
  const { contactId } = req.params;  

  const contact = await getContactById(contactId);  
  if (!contact) {  
    throw createHttpError(404, `Contact with id ${contactId} not found`);  
  }  

  res.status(200).json({  
    status: 200,  
    message: `Successfully found contact with id ${contactId}`,  
    data: contact,  
  });  
};  

export const createContactsController = async (req, res) => {  
  const contact = await createContact(req.body);  

  res.status(201).json({  
    status: 201,  
    message: 'Successfully created a contact!',  
    data: contact,  
  });  
};  

export const patchContactController = async (req, res) => {  
  const { contactId } = req.params;  

  const updatedContact = await updateContact(contactId, req.body);  
  if (!updatedContact) {  
    throw createHttpError(404, `Contact with id ${contactId} not found`);  
  }  

  res.json({  
    status: 200,  
    message: 'Successfully patched a contact!',  
    data: updatedContact,  
  });  
};  

export const deleteContactController = async (req, res) => {  
  const { contactId } = req.params;  

  const result = await serviceDeleteContact(contactId);  
  if (!result) {  
    throw createHttpError(404, `Contact with id ${contactId} not found`);  
  }  

  res.status(204).json();  
};  

export const getContacts = ctrlWrapper(getContactsController);  
export const getContact = ctrlWrapper(getContactByIdController);  
export const createContacts = ctrlWrapper(createContactsController);  
export const patchContact = ctrlWrapper(patchContactController);  
export const removeContact = ctrlWrapper(deleteContactController); 