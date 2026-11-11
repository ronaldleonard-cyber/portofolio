const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// 1. Endpoint Publik (Siapapun bisa akses)
router.post('/register', authController.register);
router.post('/login', authController.login);

// 2. Endpoint Terproteksi Autentikasi (Harus login & menyertakan Token JWT)
router.get('/me', verifyToken, authController.getMe);

// 3. Endpoint Terproteksi Otorisasi (Harus login DAN memiliki role 'admin')
router.get('/users', verifyToken, authorizeRoles('admin'), authController.getAllUsers);

module.exports = router;