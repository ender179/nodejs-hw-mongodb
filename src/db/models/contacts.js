import { Schema, model } from 'mongoose';  

const contactSchema = new Schema({  
    name: {  
        type: String,  
        required: [true, 'Name is required'],  
    },  
    phoneNumber: {  
        type: String,  
        required: [true, 'Phone number is required'],  
    },  
    email: {  
        type: String,  
    },  
    isFavourite: {  
        type: Boolean,  
        default: false,  
    },  
    contactType: {  
        type: String,  
        required: [true, 'Contact type is required'],  
    },  
});  

const Contact = model('Contact', contactSchema);  

export default Contact;  