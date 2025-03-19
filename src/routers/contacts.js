import { Router } from 'express';  
import {  
  createContactsController,  
  deleteContactController,  
  getContactByIdController,  
  getContactsController,  
  patchContactController,  
} from '../controllers/contacts.js';  
import { ctrlWrapper } from '../utils/ctrlWrapper.js';  
import { validateBody } from '../middlewares/validateBody.js';  
import {  
  createContactsSchema,  
  updateContactsSchema,  
} from '../validation/contacts.js';  
import { isValidId } from '../middlewares/isValidId.js';  

const router = Router();  

// Отримання всіх контактів  
router.get('/contacts', ctrlWrapper(getContactsController));  

// Отримання контакту за ID  
router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));  

// Створення нового контакту  
router.post('/contacts', validateBody(createContactsSchema), ctrlWrapper(createContactsController));  

// Оновлення контакту за ID  
router.patch('/contacts/:contactId', isValidId, validateBody(updateContactsSchema), ctrlWrapper(patchContactController));  

// Видалення контакту за ID  
router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));  

export default router;  