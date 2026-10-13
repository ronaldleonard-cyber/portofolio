const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Membuat connection pool untuk mengelola koneksi database secara efisien
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Penggunaan promise wrapper agar bisa memakai async/await nantinya
const db = pool.promise();

// Mengetes koneksi ke database saat file ini dijalankan
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Kesalahan Koneksi Database:', err.message);
  } else {
    console.log('✅ Berhasil terhubung ke Database MySQL (db_portofolio)');
    connection.release(); // Mengembalikan koneksi ke pool
  }
});

module.exports = db;