import { SORT_ORDER } from '../constants/index.js';  
import { ContactsCollection } from '../models/contact.js';  
import { calculatePaginationData } from '../utils/calculatePaginationData.js';  

export const getAllContacts = async ({  
  page = 1,  
  perPage = 10,  
  sortOrder = SORT_ORDER.ASC,  
  sortBy = '_id',  
}) => {  
  try {  
    const limit = perPage;  
    const skip = (page - 1) * perPage;  

    const contactsQuery = ContactsCollection.find();  
    const contactsCount = await ContactsCollection.find()  
      .merge(contactsQuery)  
      .countDocuments();  

    const contacts = await contactsQuery  
      .skip(skip)  
      .limit(limit)  
      .sort({ [sortBy]: sortOrder })  
      .exec();  

    const paginationData = calculatePaginationData(contactsCount, page, perPage);  

    return {  
      data: contacts,  
      ...paginationData,  
    };  
  } catch (error) {  
    console.error('Error fetching contacts:', error);  
    throw new Error('Could not fetch contacts');  
  }  
};  

export const getContactById = async (contactId) => {  
  try {  
    const contact = await ContactsCollection.findById(contactId);  
    if (!contact) {  
      throw new Error('Contact not found');  
    }  
    return contact;  
  } catch (error) {  
    console.error('Error fetching contact by ID:', error);  
    throw new Error('Could not fetch contact');  
  }  
};  

export const createContact = async (payload) => {  
  try {  
    const contact = await ContactsCollection.create(payload);  
    return contact;  
  } catch (error) {  
    console.error('Error creating contact:', error);  
    throw new Error('Could not create contact');  
  }  
};  

export const updateContact = async (contactId, payload) => {  
  try {  
    const rawResult = await ContactsCollection.findByIdAndUpdate(  
      contactId,  
      payload,  
      { new: true }  
    );  
    if (!rawResult) {  
      throw new Error('Contact not found');  
    }  
    return rawResult;  
  } catch (error) {  
    console.error('Error updating contact:', error);  
    throw new Error('Could not update contact');  
  }  
};  

export const deleteContact = async (contactId) => {  
  try {  
    const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });  
    if (!contact) {  
      throw new Error('Contact not found');  
    }  
    return contact;  
  } catch (error) {  
    console.error('Error deleting contact:', error);  
    throw new Error('Could not delete contact');  
  }  
};  