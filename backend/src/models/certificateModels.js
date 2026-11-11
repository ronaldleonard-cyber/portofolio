const db = require('../config/db');

// 1. GET ALL - Mengambil semua data sertifikat (diurutkan dari tanggal terbaru)
const getAllCertificates = async () => {
    const [rows] = await db.query('SELECT * FROM certificates ORDER BY issue_date DESC');
    return rows;
};

// 2. GET BY ID - Mengambil 1 data sertifikat berdasarkan ID
const getCertificateById = async (id) => {
    const [rows] = await db.query('SELECT * FROM certificates WHERE id = ?', [id]);
    return rows[0];
};

// 3. CREATE - Menambahkan sertifikat baru ke database
const createCertificate = async (data) => {
    const { name, issuer, issue_date, expiration_date, credential_id, credential_url, description } = data;
    const [result] = await db.query(
        'INSERT INTO certificates (name, issuer, issue_date, expiration_date, credential_id, credential_url, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
            name, 
            issuer, 
            issue_date, 
            expiration_date || null, 
            credential_id || null, 
            credential_url || null, 
            description || null
        ]
    );
    return result;
};

// 4. UPDATE - Memperbarui data sertifikat berdasarkan ID
const updateCertificate = async (id, data) => {
    const { name, issuer, issue_date, expiration_date, credential_id, credential_url, description } = data;
    const [result] = await db.query(
        'UPDATE certificates SET name = ?, issuer = ?, issue_date = ?, expiration_date = ?, credential_id = ?, credential_url = ?, description = ? WHERE id = ?',
        [name, issuer, issue_date, expiration_date || null, credential_id || null, credential_url || null, description || null, id]
    );
    return result;
};

// 5. DELETE - Menghapus sertifikat dari database berdasarkan ID
// Windsurf: Refactor | Explain | X
const deleteCertificate = async (id) => {
    const [result] = await db.query('DELETE FROM certificates WHERE id = ?', [id]);
    return result;
};

module.exports = {
    getAllCertificates,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate
};
