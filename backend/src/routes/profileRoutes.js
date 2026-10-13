const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

// GET /api/profile - Mengambil data profil pemilik portofolio
router.get('/', profileController.getProfile);

// PUT /api/profile/:id - Memperbarui data profil berdasarkan ID
router.put('/:id', profileController.updateProfile);

module.exports = router;