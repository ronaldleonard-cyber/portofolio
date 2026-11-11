const db = require('../config/db');

// 1. GET ALL - Mengambil seluruh riwayat CV
const getAllResumes = async () => {
    const [rows] = await db.query('SELECT * FROM resumes ORDER BY created_at DESC');
    return rows;
};

// 2. GET ACTIVE - Mengambil 1 CV yang berstatus aktif
const getActiveResume = async () => {
    const [rows] = await db.query('SELECT * FROM resumes WHERE is_active = true ORDER BY created_at DESC LIMIT 1');
    return rows[0];
};

// 3. GET BY ID - Mengambil data CV berdasarkan ID
const getResumeById = async (id) => {
    const [rows] = await db.query('SELECT * FROM resumes WHERE id = ?', [id]);
    return rows[0];
};

// 4. CREATE - Menyimpan data file CV baru
const createResume = async (data) => {
    const { title, file_name, file_path, file_size, version, is_active } = data;

    // Jika CV baru diset aktif, nonaktifkan CV lama terlebih dahulu
    if (is_active) {
        await db.query('UPDATE resumes SET is_active = FALSE');
    }

    const [result] = await db.query(
        'INSERT INTO resumes (title, file_name, file_path, file_size, version, is_active) VALUES (?, ?, ?, ?, ?, ?)',
        [title, file_name, file_path, file_size, version, is_active]
    );
    return { id: result.insertId, ...data };
};

// 5. UPDATE - Memperbarui data CV berdasarkan ID
const updateResume = async (id, data) => {
    const { title, version, is_active } = data;

    if (is_active) {
        await db.query('UPDATE resumes SET is_active = FALSE WHERE id != ?', [id]);
    }

    const [result] = await db.query(
        'UPDATE resumes SET title = ?, version = ?, is_active = ? WHERE id = ?',
        [title, version, is_active, id]
    );
    return result;
};

// 6. DELETE - Menghapus catatan CV dari database
const deleteResume = async (id) => {
    const [result] = await db.query('DELETE FROM resumes WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllResumes,
    getActiveResume,
    getResumeById,
    createResume,
    updateResume,
    deleteResume
};