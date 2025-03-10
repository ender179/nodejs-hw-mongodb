import { Router } from "express";  
import ContactController from "../controllers/contacts.js";  
import ctrlWrapper from "../utils/ctrlWrapper.js";  

const router = Router();  

router.patch("/:contactId", ctrlWrapper(ContactController.updateContact));  

export default router;  