const db = require('../config/db');

// Ini Tampilkan semua data
const getAllSkills = async () => {
    const [rows] = await db.query("SELECT * FROM skills ORDER BY category, name");
    return rows;
};

// ini tampilkan semua data berdasarkan id
const getSkillById = async (id) => {
    const [rows] = await db.query('SELECT * FROM skills WHERE id = ?', [id]);
    return rows[0];
};

// membuat data
const createSkill = async (data) => {
    const { name, category, level, icon } = data;
    const [result] = await db.query(
        'INSERT INTO skills (name, category, level, icon) VALUES (?, ?, ?, ?)',
        [name, category || 'Other', level || 0, icon]
    );
    return result;
};

// mengedit data
const updateSkill = async (id, data) => {
    const { name, category, level, icon } = data;
    const [result] = await db.query(
        'UPDATE skills SET name = ?, category = ?, level = ?, icon = ? WHERE id = ?',
        [name, category, level, icon, id]
    );
    return result;
};

// menghapus data
const deleteSkill = async (id) => {
    const [result] = await db.query('DELETE FROM skills WHERE id = ?', [id]);
    return result;
};

module.exports = { getAllSkills, getSkillById, createSkill, updateSkill, deleteSkill };
