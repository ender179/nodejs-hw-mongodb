import express from 'express';  
import ctrlWrapper from '../utils/ctrlWrapper.js';  
import contactsController from '../controllers/contacts.js';  

const router = express.Router();  

router.post('/', ctrlWrapper(contactsController.createContact));  
router.get('/', ctrlWrapper(contactsController.getAllContacts));  
router.get('/:contactId', ctrlWrapper(contactsController.getContactById));  
router.delete('/:contactId', ctrlWrapper(contactsController.deleteContact));  
router.patch('/:contactId', ctrlWrapper(contactsController.updateContact));   

export default router;  