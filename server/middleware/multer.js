import multer from 'multer'
import { MAX_FILE_SIZE_MB } from '../config/config.js';

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         return cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         console.log(file);
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
//     }
// })

const storage = multer.memoryStorage();


const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        if( file.mimetype == "image/jpeg" || 
            file.mimetype == "image/jpg" || 
            file.mimetype == "image/png"
        ) cb(null, true);
        else cb(null, false)
    },
    limits: {
        fileSize: MAX_FILE_SIZE_MB * 1024 * 1024
    }
 })

// const upload = multer({dest: 'uploads/'});

export default upload