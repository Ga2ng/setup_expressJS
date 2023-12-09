const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Periksa apakah ada token dalam header permintaan
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    // Jika tidak ada token, kirim respon error Unauthorized (401)
    return res.status(401).json({ message: 'Token tidak ditemukan' });
  }

  try {
    // Verifikasi token
    const decodedToken = jwt.verify(token, 'kunciRahasia'); // Gantilah 'kunciRahasia' dengan kunci rahasia yang sesuai

    // Jika verifikasi berhasil, lanjutkan ke rute berikutnya
    req.user = decodedToken; // Menyimpan data pengguna yang diperoleh dari token di objek req untuk digunakan di rute berikutnya jika diperlukan
    next();
  } catch (error) {
    // Jika verifikasi gagal, kirim respon error Unauthorized (401)
    console.error('Gagal melakukan verifikasi token:', error);
    res.status(401).json({ message: 'Token tidak valid' });
  }
};

module.exports = authMiddleware;
