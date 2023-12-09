const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const Mahasiswa = db.mahasiswa;

exports.login = async (req, res) => {
  try {
    const { nama_lengkap, password } = req.body;

    // Temukan pengguna berdasarkan nama_lengkap
    const mahasiswa = await Mahasiswa.findOne({ nama_lengkap });
    console.log(mahasiswa);

    if (!mahasiswa) {
      return res
        .status(401)
        .json({ message: "nama_lengkap atau kata sandi tidak valid" });
    }

    // Verifikasi kata sandi
    const isPasswordValid = await bcrypt.compare(password, mahasiswa.password);
    // console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "nama_lengkap atau kata sandi tidak valid" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: mahasiswa._id, nama_lengkap: mahasiswa.nama_lengkap },
      "kunciRahasia"
    );

    console.log('token', token);
    const decodedToken = jwt.decode(token);

    console.log("Decoded Token:", decodedToken);
    // Kirim token sebagai respon
    res.json({ token });
  } catch (error) {
    console.error("Gagal melakukan login:", error);
    res.status(500).json({ message: "Gagal melakukan login" });
  }
};
