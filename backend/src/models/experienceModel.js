const db = require('../config/db');

const getAllExperiences = async () => {
  const [rows] = await db.query('SELECT * FROM experiences ORDER BY start_date DESC');
  return rows;
};

const getExperienceById = async (id) => {
  const [rows] = await db.query('SELECT * FROM experiences WHERE id = ?', [id]);
  return rows[0];
};

const createExperience = async (data) => {
  const { title, company, location, start_date, end_date, is_current, description } = data;
  const [result] = await db.query(
    'INSERT INTO experiences (title, company, location, start_date, end_date, is_current, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [title, company, location, start_date, end_date, is_current || false, description]
  );
  return result;
};

const updateExperience = async (id, data) => {
  const { title, company, location, start_date, end_date, is_current, description } = data;
  const [result] = await db.query(
    'UPDATE experiences SET title = ?, company = ?, location = ?, start_date = ?, end_date = ?, is_current = ?, description = ? WHERE id = ?',
    [title, company, location, start_date, end_date, is_current || false, description, id]
  );
  return result;
};

const deleteExperience = async (id) => {
  const [result] = await db.query('DELETE FROM experiences WHERE id = ?', [id]);
  return result;
};

module.exports = {
  getAllExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience
};