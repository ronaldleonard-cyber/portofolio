const testimonialModel = require('../models/testimonialsModels');

const testimonialsController = {
  // 1. GET ALL
  getAllTestimonials: async (req, res) => {
    try {
      const testimonials = await testimonialModel.getAllTestimonials();
      res.status(200).json({
        success: true,
        message: 'Berhasil mengambil semua data testimoni',
        data: testimonials
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  },

  // 2. GET BY ID
  getTestimonialById: async (req, res) => {
    try {
      const { id } = req.params;
      const testimonial = await testimonialModel.getTestimonialById(id);

      if (!testimonial) {
        return res.status(404).json({
          success: false,
          message: 'Testimoni tidak ditemukan'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Testimoni ditemukan',
        data: testimonial
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  },

  // 3. CREATE
  createTestimonial: async (req, res) => {
    try {
      const data = req.body;

      // Validasi input wajib (name, role, message)
      if (!data.name || !data.role || !data.message) {
        return res.status(400).json({
          success: false,
          message: 'Nama (name), peran (role), dan pesan (message) wajib diisi!'
        });
      }

      const result = await testimonialModel.createTestimonial(data);
      res.status(201).json({
        success: true,
        message: 'Testimoni berhasil ditambahkan',
        data: { id: result.insertId, ...data }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  },

  // 4. UPDATE
  updateTestimonial: async (req, res) => {
    try {
      const { id } = req.params;
      const data = req.body;

      const existingTestimonial = await testimonialModel.getTestimonialById(id);
      if (!existingTestimonial) {
        return res.status(404).json({
          success: false,
          message: 'Testimoni yang akan di-update tidak ditemukan'
        });
      }

      await testimonialModel.updateTestimonial(id, data);
      res.status(200).json({
        success: true,
        message: 'Testimoni berhasil diperbarui'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  },

  // 5. DELETE
  deleteTestimonial: async (req, res) => {
    try {
      const { id } = req.params;
      const existingTestimonial = await testimonialModel.getTestimonialById(id);

      if (!existingTestimonial) {
        return res.status(404).json({
          success: false,
          message: 'Testimoni tidak ditemukan'
        });
      }

      await testimonialModel.deleteTestimonial(id);
      res.status(200).json({
        success: true,
        message: 'Testimoni berhasil dihapus'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server Error',
        error: error.message
      });
    }
  }
};

module.exports = testimonialsController;