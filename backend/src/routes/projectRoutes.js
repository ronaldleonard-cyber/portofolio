const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');

// GET    /api/projects      - Mengambil semua proyek
router.get('/', projectController.getAllProjects);

// GET    /api/projects/:id  - Mengambil satu proyek berdasarkan ID
router.get('/:id', projectController.getProjectById);

// POST   /api/projects      - Menambahkan proyek baru
router.post('/', verifyToken, authorizeRoles('admin'), projectController.createProject);

// PUT    /api/projects/:id  - Memperbarui proyek berdasarkan ID
router.put('/:id', verifyToken, authorizeRoles('admin'),  projectController.updateProject);

// DELETE /api/projects/:id  - Menghapus proyek berdasarkan ID
router.delete('/:id', verifyToken, authorizeRoles('admin'), projectController.deleteProject);

module.exports = router;
 