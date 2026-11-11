const db = require('../config/db');
// 1. Mencari user berdasarkan username (untuk cek duplikasi / login)
const findByUsername = async (username) => {
    const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
};

// 2. Mencari user berdasarkan email (untuk cek duplikasi / login)
const findByEmail = async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
};

// 3. Mencari user berdasarkan ID (tanpa menampilkan password)
const findById = async (id) => {
    const [rows] = await db.query(
        'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
        [id]
    );
    return rows[0];
};

// 4. Mendaftarkan user baru (Create / Register)
const createUser = async (data) => {
    const { username, email, password, role } = data;
    const [result] = await db.query(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        [username, email, password, role || 'user']
    );
    return result;
};

// 5. Mengambil seluruh data user (Khusus Admin)
const getAllUsers = async () => {
    const [rows] = await db.query(
        'SELECT id, username, email, role, created_at, updated_at FROM users ORDER BY created_at DESC'
    );
    return rows;
};

module.exports = {
    findByUsername,
    findByEmail,
    findById,
    createUser,
    getAllUsers
};