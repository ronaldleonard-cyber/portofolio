const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');

// 1. REGISTER: Mendaftarkan akun baru (password di-hash)
const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validasi input wajib
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, email, dan password wajib diisi!'
            });
        }

        // Cek apakah username sudah dipakai
        const existingUsername = await userModel.findByUsername(username);
        if (existingUsername) {
            return res.status(400).json({
                success: false,
                message: 'Username sudah digunakan, silakan pilih username lain!'
            });
        }

        // Cek apakah email sudah dipakai
        const existingEmail = await userModel.findByEmail(email);
        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: 'Email sudah terdaftar, silakan gunakan email lain!'
            });
        }

        // Hash password menggunakan bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tentukan role (default ke 'user' jika tidak diisi)
        const userRole = role || 'user';

        // Simpan user baru ke database
        const userId = await userModel.createUser({
            username,
            email,
            password: hashedPassword,
            role: userRole
        });

        return res.status(201).json({
            success: true,
            message: 'Registrasi berhasil!',
            data: { id: userId, username, email, role: userRole }
        });

    } catch (error) {
        console.error('Error saat register:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

// 2. LOGIN: Memverifikasi akun & mencetak token JWT
const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        // Validasi input login (bisa menggunakan username atau email)
        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username/Email dan password wajib diisi!'
            });
        }

        // Cari user berdasarkan username atau email
        let user = await userModel.findByUsername(identifier);
        if (!user) {
            user = await userModel.findByEmail(identifier);
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Akun tidak ditemukan!'
            });
        }

        // Cek kecocokan password dengan hash di database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: 'Password salah!'
            });
        }

        // Buat token JWT yang berisi payload data user
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login berhasil!',
            token,
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error('Error saat login:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

// 3. GET PROFILE / ME: Mengambil data user yang sedang login
const getMe = async (req, res) => {
    try {
        // req.user didapat dari hasil verifikasi middleware JWT
        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Data pengguna tidak ditemukan'
            });
        }

        return res.status(200).json({
            success: true,
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error saat mengambil profil:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

// 4. GET ALL USERS (Khusus Admin): Menampilkan seluruh daftar pengguna
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.findAll();
        return res.status(200).json({
            success: true,
            total: users.length,
            data: users
        });
    } catch (error) {
        console.error('Error saat mengambil semua users:', error);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            error: error.message
        });
    }
};

module.exports = {
    register,
    login,
    getMe,
    getAllUsers
};