const jwt = require('jsonwebtoken');

// // 1. Middleware Autentikasi: Memeriksa apakah user sudah login & tokennya valid
const verifyToken = (req, res, next) => {
    try {
        // Ambil header Authorization (Format: Bearer <token>)
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Akses ditolak! Token autentikasi tidak ditemukan.'
            });
        }

        // Pisahkan kata 'Bearer' dengan string token
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Format token salah! Gunakan: Bearer <token>'
            });
        }

        // Verifikasi token menggunakan secret key dari .env
        const secret = process.env.JWT_SECRET || 'kunci_rahasia_portofolio_super_aman_12345';
        const decoded = jwt.verify(token, secret);

        // Simpan data payload user (id, username, role) ke object request
        req.user = decoded;

        // Lanjutkan ke controller / middleware berikutnya
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Token tidak valid atau sudah kadaluarsa!',
            error: error.message
        });
    }
};

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // Memastikan req.user ada dan rolenya termasuk dalam daftar allowedRoles
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Akses dilarang! Role '${req.user ? req.user.role : 'Guest'}' tidak memiliki izin untuk fitur ini.`
            });
        }
        next();
    };
};

module.exports = {
    verifyToken,
    authorizeRoles
};