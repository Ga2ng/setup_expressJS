const bcrypt = require('bcrypt');

module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      nama_lengkap: String,
      jenis_kelamin: String,
      tanggal_lahir: String,
      tempat_lahir: String,
      alamat: String,
      password: String,
    },
    {
      timestamps: true,
    }
  );

  // Middleware untuk hashing password sebelum disimpan
  schema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }

    try {
      const hashedPassword = await bcrypt.hash(this.password, 10); // Angka 10 menunjukkan seberapa banyak iterasi hash yang akan dilakukan
      this.password = hashedPassword;
      next();
    } catch (error) {
      return next(error);
    }
  });

  //untuk menghilangkan dan menganti nama attribut
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;

    return object;
  });

  return mongoose.model("mahasiswa", schema);
};
