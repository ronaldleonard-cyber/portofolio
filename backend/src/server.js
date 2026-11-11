const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');


const profileRoutes = require('./routes/profileRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const testimonialsRoutes = require('./routes/testimonialsRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const authRoutes = require('./routes/authRoutes');
dotenv.config();

// load koneksi database
// const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../public/uploads'))); 
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experienceRoutes)
app.use('/api/contact', contactRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/auth', authRoutes);
const port = 5000;

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.get('/', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Selamat datang di API portofolio dinamis',
//     version: '1.0.0',
//   });
// });

// //endpoint untuk cek status API
// app.get('/status', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Server dalam keadaan dan aktif.',
//     timestamp: new Date().toString(),
//   });
// });

// app.get('/api/biodata', (req, res) => {
//   res.status(200).json({
//     "success": true,
//     "data": {
//       "nama": "Agustinus Ronald Leonardus J",
//       "kelas": "XI RPL 1",
//       "cita_cita": "aeronautical engineer",
//       "hobi": "Coding & Gaming"
//     }
//   });
// });

// //middleware menangani route yang tidak ditemukan (404 not found)
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Endpoint tidak ditemukan.',
//   });
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});