import { Router } from "express";  
import ContactController from "../controllers/contacts.js";  
import ctrlWrapper from "../utils/ctrlWrapper.js";  

const router = Router();  

router.get("/", ctrlWrapper(ContactController.getAllContacts));  

router.get("/:contactId", ctrlWrapper(ContactController.getContactById));  

router.post("/", ctrlWrapper(ContactController.createContact));  

router.delete("/:contactId", ctrlWrapper(ContactController.deleteContact));  

export default router;  