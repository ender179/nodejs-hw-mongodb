import { Router } from "express";  
import { updateContact } from "../controllers/contacts";  
import ctrlWrapper from "../utils/ctrlWrapper";  

const router = Router();  

router.patch("/:contactId", ctrlWrapper(updateContact));  

export default router;  