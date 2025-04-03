import { 
  createContact, 
  deleteContact, 
  getAllContacts, 
  getContactById, 
  updateContact 
} from '../services/contacts.js'; 
import createHttpError from 'http-errors'; 
import { parsePaginationParams } from '../utils/parsePaginationParams.js'; 
import { parseSortParams } from '../utils/parseSortParams.js'; 
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => { 
  const { page, perPage } = parsePaginationParams(req.query); 
  const { sortOrder, sortBy } = parseSortParams(req.query); 
  const { _id: userId } = req.user; 

  try { 
    const contacts = await getAllContacts(userId, page, perPage, sortBy, sortOrder); 
    res.json({ 
      status: 200, 
      message: 'Contacts retrieved successfully.', 
      data: contacts, 
    }); 
  } catch (error) { 
    res.status(500).json({ 
      status: 500, 
      message: 'Failed to retrieve contacts.', 
      error: error.message, 
    }); 
  } 
};

export const getContactByIdController = async (req, res) => { 
  const { id } = req.params; 

  try { 
    const contact = await getContactById(id); 
    if (!contact) { 
      throw createHttpError(404, 'Contact not found'); 
    } 
    res.json({ 
      status: 200, 
      message: 'Contact retrieved successfully.', 
      data: contact, 
    }); 
  } catch (error) { 
    res.status(error.status || 500).json({ 
      status: error.status || 500, 
      message: error.message, 
    }); 
  } 
};

export const createContactController = async (req, res) => { 
  const { name, email, phone } = req.body; 

  try { 
    const newContact = await createContact({ name, email, phone, userId: req.user._id }); 
    res.status(201).json({ 
      status: 201, 
      message: 'Contact created successfully.', 
      data: newContact, 
    }); 
  } catch (error) { 
    res.status(400).json({ 
      status: 400, 
      message: 'Failed to create contact.', 
      error: error.message, 
    }); 
  } 
};

export const updateContactController = async (req, res) => { 
  const { id } = req.params; 
  const updateData = req.body; 

  try { 
    const updatedContact = await updateContact(id, updateData); 
    if (!updatedContact) { 
      throw createHttpError(404, 'Contact not found'); 
    } 
    res.json({ 
      status: 200, 
      message: 'Contact updated successfully.', 
      data: updatedContact, 
    }); 
  } catch (error) { 
    res.status(error.status || 500).json({ 
      status: error.status || 500, 
      message: error.message, 
    }); 
  } 
};

export const patchContactController = async (req, res) => { 
  const { id } = req.params; 
  const updateData = req.body; 

  try { 
    const updatedContact = await updateContact(id, updateData); 
    if (!updatedContact) { 
      throw createHttpError(404, 'Contact not found'); 
    } 
    res.json({ 
      status: 200, 
      message: 'Contact partially updated successfully.', 
      data: updatedContact, 
    }); 
  } catch (error) { 
    res.status(error.status || 500).json({ 
      status: error.status || 500, 
      message: error.message, 
    }); 
  } 
};

export const deleteContactController = async (req, res) => { 
  const { id } = req.params; 

  try { 
    const deletedContact = await deleteContact(id); 
    if (!deletedContact) { 
      throw createHttpError(404, 'Contact not found'); 
    } 
    res.status(204).send(); 
  } catch (error) { 
    res.status(error.status || 500).json({ 
      status: error.status || 500, 
      message: error.message, 
    }); 
  } 
};