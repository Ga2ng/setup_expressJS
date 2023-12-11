const jwt = require('jsonwebtoken');
const db = require("../models");
const Mahasiswa = db.mahasiswa;

const findUserByIdInDatabase = async (userId) => {
  try {
    const user = await Mahasiswa.findById(userId);
    return user;
  } catch (error) {
    console.error('Gagal mencari user di database:', error);
    return null;
  }
};

const authMiddleware = async (req, res, next) => {
  // Periksa apakah ada token dalam header permintaan
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    // Jika tidak ada token, kirim respon error Unauthorized (401)
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  try {
    const decodedToken = jwt.verify(token, 'secretKey');

    const userFromDatabase = await findUserByIdInDatabase(decodedToken.id);

    if (!userFromDatabase) {
      return res.status(401).json({ message: 'ID tidak terdaftar di database' });
    }
    next();
  } catch (error) {
    // Jika verifikasi gagal, kirim respon error Unauthorized (401)
    console.error('Gagal melakukan verifikasi token:', error);
    res.status(401).json({ message: 'Token tidak valid' });
  }
};

module.exports = authMiddleware;
