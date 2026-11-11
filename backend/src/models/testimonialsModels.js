const db = require('../config/db'); // Sesuaikan dengan path koneksi database Anda

const testimonialModel = {
  // Ambil semua data testimoni
  getAllTestimonials: async () => {
    const [rows] = await db.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    return rows;
  },

  // Ambil data testimoni berdasarkan ID
  getTestimonialById: async (id) => {
    const [rows] = await db.query('SELECT * FROM testimonials WHERE id = ?', [id]);
    return rows[0];
  },

  // Tambah testimoni baru
  createTestimonial: async (data) => {
    const { name, role, company, message, avatar_url, rating } = data;
    const [result] = await db.query(
      'INSERT INTO testimonials (name, role, company, message, avatar_url, rating) VALUES (?, ?, ?, ?, ?, ?)',
      [name, role, company, message, avatar_url, rating || 5]
    );
    return result;
  },

  // Update testimoni
  updateTestimonial: async (id, data) => {
    const { name, role, company, message, avatar_url, rating } = data;
    const [result] = await db.query(
      'UPDATE testimonials SET name = ?, role = ?, company = ?, message = ?, avatar_url = ?, rating = ? WHERE id = ?',
      [name, role, company, message, avatar_url, rating, id]
    );
    return result;
  },

  // Hapus testimoni
  deleteTestimonial: async (id) => {
    const [result] = await db.query('DELETE FROM testimonials WHERE id = ?', [id]);
    return result;
  }
};

module.exports = testimonialModel;