import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { createContact, getAllContacts, updateContact, deleteContact } from '../controllers/contacts.js';
import validatePagination from '../middlewares/validatePagination.js';
import { validateBody } from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';
import { contactSchema } from '../middlewares/validationSchemas.js';

const router = express.Router();

router.get('/', validatePagination, ctrlWrapper(getAllContacts));
router.post('/', validateBody(contactSchema), ctrlWrapper(createContact));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContact));
router.patch('/:contactId', isValidId, validateBody(contactSchema), ctrlWrapper(updateContact));

export default router;