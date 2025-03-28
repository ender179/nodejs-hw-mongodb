import express from 'express';  
import multer from 'multer';  
import cloudinary from '../config/cloudinary.js';   
import createHttpError from 'http-errors';  
import Contact from '../db/models/contacts.js';   
const router = express.Router();  

const storage = multer.memoryStorage();  
const upload = multer({ storage });  

router.post('/', upload.single('photo'), async (req, res, next) => {  
    const { name, email, phoneNumber, contactType } = req.body;  

    try {  
        let photoUrl = '';  
        if (req.file) {  
            const result = await cloudinary.uploader.upload_stream(req.file.buffer);   
            photoUrl = result.secure_url;  
        }  

        const newContact = new Contact({  
            name,  
            email,  
            phoneNumber,  
            contactType,  
            photo: photoUrl,  
            userId: req.user._id,   
        });  

        await newContact.save();  
        res.status(201).json(newContact);  
    } catch (error) {  
        next(createHttpError(500, "Ошибка при сохранении контакта."));  
    }  
});  

router.patch('/:contactId', upload.single('photo'), async (req, res, next) => {  
    const { contactId } = req.params;  

    try {  
        const contact = await Contact.findById(contactId);  
        if (!contact) throw createHttpError(404, 'Контакт не найден!');  

        if (req.file) {  
            const result = await cloudinary.uploader.upload_stream(req.file.buffer); 
            contact.photo = result.secure_url;  
        }  

        Object.assign(contact, req.body);  
        await contact.save();  
        res.status(200).json(contact);  
    } catch (error) {  
        next(createHttpError(500, "Ошибка при обновлении контакта."));  
    }  
});  

export default router;  