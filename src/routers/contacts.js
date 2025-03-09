import { Router } from "express";  
import { updateContact } from "../controllers/contacts.js";  
import ctrlWrapper from "../utils/ctrlWrapper.js";  

const router = Router();  

router.patch("/:contactId", ctrlWrapper(updateContact));  

export default router;  