import contactService from '../services/contacts.js';  
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
    next(error);  
  }  
};  

const getAllContacts = async (req, res, next) => {  
  try {  
    const { page = 1, perPage = 10 } = req.query;  
    const skip = (page - 1) * perPage;  
    const limit = parseInt(perPage);  

    const contacts = await contactService.getAllContacts({ skip, limit });  
    const totalContacts = await contactService.countContacts();  

    res.status(200).json({  
      status: 200,  
      message: 'Successfully found contacts!',  
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
    next(error);  
  }  
};  

const updateContact = async (req, res, next) => {  
  const { contactId } = req.params;  
  const updates = {  
    ...req.body,  
    updatedAt: Date.now(),  
  };  

  const updatedContact = await contactService.updateContact(contactId, updates);  
  if (!updatedContact) {  
    return next(createError(404, "Contact not found"));  
  }  

  res.status(200).json({  
    status: 200,  
    message: "Contact updated successfully!",  
    data: updatedContact,  
  });  
};  

const deleteContact = async (req, res, next) => {  
  const { contactId } = req.params;  

  const deletedContact = await contactService.deleteContact(contactId);  
  if (!deletedContact) {  
    return next(createError(404, "Contact not found"));  
  }  

  res.status(200).json({  
    status: 200,  
    message: "Contact deleted successfully!",  
    data: deletedContact,  
  });  
};  

export {  
  createContact,  
  getAllContacts,  
  updateContact,  
  deleteContact, 
};
