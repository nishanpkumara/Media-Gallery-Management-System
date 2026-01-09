import multer from 'multer';
import path from 'path';

// Storage configuration
const storage = multer.diskStorage({});

// File validation logic
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Images Only (JPG/PNG)!'));
    }
};

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter
});