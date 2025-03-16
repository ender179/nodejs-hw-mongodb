import express from 'express';  
import {  
  createContact,  
  getAllContacts,  
  updateContact,  
  deleteContact,  
} from '../controllers/contacts.js';  
import { validateBody } from '../middlewares/validateBody.js';  
import isValidId from '../middlewares/isValidId.js';  
import createContactSchema from '../validation/createContactSchema.js';  
import ctrlWrapper from '../utils/ctrlWrapper.js';  

const router = express.Router();  

router.get('/', ctrlWrapper(getAllContacts));  
router.post('/', validateBody(createContactSchema), ctrlWrapper(createContact));  
router.patch('/:contactId', isValidId, validateBody(createContactSchema), ctrlWrapper(updateContact));  
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));  

export default router;  