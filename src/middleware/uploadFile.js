import multer from 'multer';
import { nanoid } from 'nanoid/non-secure';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Derive __dirname in ES module context
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const customValidation = {
    images: [
        'image/jpeg',
        'image/gif',
        'image/jpg',
        'image/png',
        'image/webp',
    ]
};

const uploadFile = (validation, folderName) => {
    const uploadDir = join(__dirname, '../../uploads', folderName);

    // Ensure that the directory exists
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
            cb(null, nanoid(30) + '-' + file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (validation.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    };

    const upload = multer({ storage, fileFilter });

    return upload;
};

export default uploadFile;
