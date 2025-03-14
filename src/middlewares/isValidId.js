import { Types } from 'mongoose';  

const isValidId = (req, res, next) => {  
    const { contactId } = req.params;  
    if (!Types.ObjectId.isValid(contactId)) {  
        return res.status(404).json({ message: 'Contact not found' });  
    }  
    next();  
};  

export default isValidId;  