const resumeModel = require('../models/resumeModel');
const fs = require('fs');
const path = require('path');

// 1. GET ALL RESUMES
const getAllResumes = async (req, res) => {
    try {
        const resumes = await resumeModel.getAllResumes();
        res.status(200).json({
            success: true,
            data: resumes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// 2. GET ACTIVE RESUME
const getActiveResume = async (req, res) => {
    try {
        const resume = await resumeModel.getActiveResume();
        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Tidak ada CV aktif yang ditemukan'
            });
        }
        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};


// 3. GET BY ID - Mengambil data CV berdasarkan ID
// GET RESUME BY ID
const getResumeById = async (req, res) => {
    try {
        const { id } = req.params;
        const resume = await resumeModel.getResumeById(id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Data CV tidak ditemukan'
            });
        }

        res.status(200).json({
            success: true,
            data: resume
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// 3. UPLOAD / CREATE RESUME
const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'File PDF CV wajib diunggah'
            });
        }

        const { title, version, is_active } = req.body;

        if (!title) {
            // Hapus file fisik jika validasi judul gagal
            fs.unlinkSync(req.file.path);
            return res.status(400).json({
                success: false,
                message: 'Judul CV (title) wajib diisi'
            });
        }

        const data = {
            title,
            file_name: req.file.filename,
            file_path: `/uploads/cv/${req.file.filename}`,
            file_size: req.file.size,
            version: version || '1.0',
            is_active: is_active === 'true' || is_active === true || is_active === '1'
        };

        const result = await resumeModel.createResume(data);

        res.status(201).json({
            success: true,
            message: 'File PDF CV berhasil diunggah',
            data: {
                id: result.id,
                file_url: data.file_path,
                ...data
            }
        });
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// 4. UPDATE RESUME
const updateResume = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, version, is_active } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Judul CV (title) wajib diisi'
            });
        }

        const existingResume = await resumeModel.getResumeById(id);
        if (!existingResume) {
            return res.status(404).json({
                success: false,
                message: 'Data CV tidak ditemukan'
            });
        }

        const data = {
            title,
            version: version || '1.0',
            is_active: is_active === 'true' || is_active === true || is_active === '1'
        };

        await resumeModel.updateResume(id, data);

        res.status(200).json({
            success: true,
            message: 'Data CV berhasil diperbarui',
            data: { id, ...data }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// 5. DELETE RESUME (Menghapus database sekaligus file fisik di harddisk)
const deleteResume = async (req, res) => {
    try {
        const { id } = req.params;
        const resume = await resumeModel.getResumeById(id);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: 'Data CV tidak ditemukan'
            });
        }

        // Hapus file fisik dari folder penyimpanan server jika file-nya ada
        const filePath = path.join(__dirname, '../../public', resume.file_path);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Hapus record dari database
        await resumeModel.deleteResume(id);

        res.status(200).json({
            success: true,
            message: 'File CV dan datanya berhasil dihapus'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    getAllResumes,
    getResumeById,
    getActiveResume,
    uploadResume,
    updateResume,
    deleteResume
};