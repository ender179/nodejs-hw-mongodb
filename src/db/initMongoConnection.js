import { connect } from 'mongoose';  

const initMongoConnection = async () => {  
  try {  
    await connect(process.env.MONGODB_URL, {  
      user: process.env.MONGODB_USER,  
      pass: process.env.MONGODB_PASSWORD,  
      dbName: process.env.MONGODB_DB,  
    });  
    console.log('Mongo connection successfully established!');  
  } catch (error) {  
    console.error('Mongo connection failed!', error);  
    process.exit(1);  
  }  
};  

export default initMongoConnection;