import Contact from '../models/Contact';

const addContact = async (contactData) => {
    try {
        const newContact = new Contact(contactData);
        await newContact.save();
        return newContact;
    } catch (error) {
        console.error('Error adding contact:', error);
        throw error;
    }
};

const updateContact = async (contactId, updateData) => {
    try {
        const contact = await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
        return contact;
    } catch (error) {
        console.error('Error updating contact:', error);
        throw error;
    }
};

const deleteContact = async (contactId) => {
    try {
        const result = await Contact.findByIdAndDelete(contactId);
        return result;
    } catch (error) {
        console.error('Error deleting contact:', error);
        throw error;
    }
};

export default {
    addContact,
    updateContact,
    deleteContact
};