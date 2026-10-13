const profileModel = require('../models/profileModel');

// 1. Controller: Mengambil data profil
const getProfile = async (req, res) => {
    try {
        const profile = await profileModel.getProfile();

        // Jika data profil belum ada di database
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Data profil belum tersedia.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Berhasil mengambil data profil.',
            data: profile
        });
    } catch (error) {
        console.error("Error getProfile: ", error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

// 2. Controller: Memperbarui data profil
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        // Validasi sederhana: pastikan nama dan role tidak kosong
        if (!data.name || !data.role) {
            return res.status(400).json({
                success: false,
                message: 'Kolom "name" dan "role" wajib diisi!'
            });
        }

        const result = await profileModel.updateProfile(id, data);

        // Cek apakah ada baris yang ter-update
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: `Profil dengan ID ${id} tidak ditemukan.`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Data profil berhasil diperbarui.'
        });
        
    } catch (error) {
        console.error('Error updateProfile:', error.message);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server.',
            error: error.message
        });
    }
};

module.exports = {
    getProfile,
    updateProfile
};