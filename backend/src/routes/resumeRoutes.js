const express = require('express');
const router = express.Router();
const resumeController = require('../controller/resumeController.js')
const upload = require('../config/uploadConfig');

// 1. GET /api/resumes - Ambil semua riwayat file CV
router.get('/', resumeController.getAllResumes);

// 2. GET /api/resumes/active - Ambil 1 CV aktif (digunakan oleh tombol Download CV frontend)
router.get('/active', resumeController.getActiveResume);

// 3. GET /api/resumes/:id - Ambil detail CV berdasarkan ID
router.get('/:id', resumeController.getResumeById);

// 4. POST /api/resumes - Upload file PDF CV baru (menggunakan middleware upload.single('resume_file'))
router.post('/', upload.single('resume_file'), resumeController.uploadResume);

// 5. PUT /api/resumes/:id - Update data metadata CV (judul, versi, status aktif)
router.put('/:id', resumeController.updateResume);

// 6. DELETE /api/resumes/:id - Hapus file PDF dan datanya dari server
router.delete('/:id', resumeController.deleteResume);

module.exports = router;