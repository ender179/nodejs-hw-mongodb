import multer from 'multer';  
import fs from 'fs';  
import path from 'path';  

const TEMP_UPLOAD_DIR = path.resolve('uploads');  

if (!fs.existsSync(TEMP_UPLOAD_DIR)) {  
  fs.mkdirSync(TEMP_UPLOAD_DIR, { recursive: true });  
}  

const storage = multer.diskStorage({  
  destination: function (req, file, cb) {  
    cb(null, TEMP_UPLOAD_DIR);  
  },  
  filename: function (req, file, cb) {  
    const uniqueSuffix = Date.now();  
    cb(null, `${uniqueSuffix}_${file.originalname}`);  
  },  
});  

const fileFilter = (req, file, cb) => {  
  const filetypes = /jpeg|jpg|png|gif/;   
  const mimetype = filetypes.test(file.mimetype);  
  if (mimetype) {  
    return cb(null, true);  
  }  
  cb(new Error('Invalid file type'), false);  
};  

export const upload = multer({   
  storage,  
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,  
});  