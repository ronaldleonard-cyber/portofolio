const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan folder backend/public/uploads/cv sudah ada
const uploadDir = path.join(__dirname, '../../public/uploads/cv');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi penyimpanan file dengan Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Format penamaan file: resume-TIMESTAMP.pdf
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, `resume-${uniqueSuffix}${ext}`);
    }
});

// Filter file: Hanya menerima file PDF
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Hanya file bertipe PDF yang diperbolehkan!'), false);
    }
};

// Batas ukuran file: 5 MB
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Batas max 5 MB
    fileFilter: fileFilter
});

module.exports = upload;