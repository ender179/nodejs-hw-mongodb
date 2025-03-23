import { SORT_ORDER } from '../constants/index.js';  
import { ContactsCollection } from '../models/contact.js';  
import { calculatePaginationData } from '../utils/calculatePaginationData.js';  

export const getAllContacts = async ({  
  page = 1,  
  perPage = 10,  
  sortOrder = SORT_ORDER.ASC,  
  sortBy = '_id',  
}) => {  
  const limit = perPage;  
  const skip = (page - 1) * perPage;  

  const contactsCount = await ContactsCollection.countDocuments();  
  const contacts = await ContactsCollection.find()  
    .skip(skip)  
    .limit(limit)  
    .sort({ [sortBy]: sortOrder });  

  const paginationData = calculatePaginationData(contactsCount, page, perPage);  

  return {  
    data: contacts,  
    ...paginationData,  
  };  
};  

export const getContactById = async (contactId) => {  
  const contact = await ContactsCollection.findById(contactId);  
  if (!contact) {  
    throw new Error('Contact not found');  
  }  
  return contact;  
};  

export const createContact = async (payload) => {  
  const contact = await ContactsCollection.create(payload);  
  return contact;  
};  

export const updateContact = async (contactId, payload) => {  
  const updatedContact = await ContactsCollection.findByIdAndUpdate(  
    contactId,  
    payload,  
    { new: true }  
  );  
  if (!updatedContact) {  
    throw new Error('Contact not found');  
  }  
  return updatedContact;  
};  

export const deleteContact = async (contactId) => {  
  const deletedContact = await ContactsCollection.findByIdAndDelete(contactId);  
  if (!deletedContact) {  
    throw new Error('Contact not found');  
  }  
  return deletedContact;  
};  