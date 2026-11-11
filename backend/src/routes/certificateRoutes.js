const express = require('express');
const router = express.Router();
const certificateController = require('../controller/certificateController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');


// 1. GET /api/certificates - Ambil semua data sertifikat
router.get('/', certificateController.getAllCertificates);

// 2. GET /api/certificates/:id - Ambil 1 sertifikat berdasarkan ID
router.get('/:id', certificateController.getCertificateById);

// 3. POST /api/certificates - Tambah data sertifikat baru
router.post('/', verifyToken, authorizeRoles('admin'), certificateController.createCertificate);

// 4. PUT /api/certificates/:id - Update data sertifikat berdasarkan ID
router.put('/:id', verifyToken, authorizeRoles('admin'), certificateController.updateCertificate);

// 5. DELETE /api/certificates/:id - Hapus data sertifikat berdasarkan ID
router.delete('/:id', verifyToken, authorizeRoles('admin'), certificateController.deleteCertificate);

module.exports = router;
