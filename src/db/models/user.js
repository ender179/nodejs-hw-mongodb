import { Schema, model } from 'mongoose';  

const userSchema = new Schema({  
    name: { type: String, required: true },  
    email: { type: String, required: true, unique: true },  
    password: { type: String, required: true },  
}, { timestamps: true });  

userSchema.statics.findOneUser = async function(query) {  
    return await this.findOne(query);  
};  

const UsersCollection = model('User', userSchema);  

export default UsersCollection;  