import { model, Schema } from 'mongoose';  

const contactsSchema = new Schema({  
  name: { type: String, required: true },  
  phoneNumber: { type: String },  
  email: { type: String, required: true },  
  isFavorite: { type: Boolean, default: false },  
  contactType: {  
    type: String,  
    enum: ['work', 'home', 'personal'],  
    default: 'personal',  
  },  
  userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },  
}, { timestamps: true });  

export default model('contacts', contactsSchema);  