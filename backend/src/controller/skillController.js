const skillModel = require('../models/skillModel');

const getAllSkills = async (req, res) => {
    try {
        const skills = await skillModel.getAllSkills();
        res.status(200).json({ success: true, total: skills.length, data: skills });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const getSkillById = async (req, res) => {
    try {
        const { id } = req.params;
        const skill = await skillModel.getSkillById(id);
        if (!skill) return res.status(404).json({ success: false, message: 'Data tidak ditemukan' });
        res.status(200).json({ success: true, data: skill });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const createSkill = async (req, res) => {
    try {
        const data = req.body;
        if (!data.name) return res.status(400).json({ success: false, message: 'Nama skill wajib diisi' });
        const result = await skillModel.createSkill(data);
        res.status(201).json({ success: true, message: 'Skill ditambahkan', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const updateskill = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    // Validasi input data nama
    if (!data.name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nama skill wajib diisi' 
      });
    }

    const result = await skillModel.updateSkill(id, data);
    
    // Jika data tidak ditemukan di database
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Data tidak ditemukan' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Skill diperbarui' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

const deleteskill = async (req, res) => {
  try {
    // Perbaikan: Mengubah req.paramss menjadi req.params
    const { id } = req.params;
    
    // Perbaikan: Memanggil fungsi deleteSkill terlebih dahulu sebelum mengecek hasilnya
    const result = await skillModel.deleteSkill(id);
    
    // Mengecek apakah ada baris data yang terhapus
    if (result.affectedRows === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'Data tidak ditemukan' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: 'Skill dihapus' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server Error', 
      error: error.message 
    });
  }
};

module.exports = { getAllSkills, getSkillById, createSkill, updateskill, deleteskill };