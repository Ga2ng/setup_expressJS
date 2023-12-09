  module.exports = app => {
    const mahasiswa = require("../controllers/mahasiswaController");
    const router = require("express").Router();

    router.get("/", mahasiswa.findAll);
    router.get("/:id", mahasiswa.show);
    router.post("/", mahasiswa.create);
    router.put("/:id", mahasiswa.update);
    router.delete("/:id", mahasiswa.delete);

    app.use("/mahasiswa", router);

    //Get localhost:8000/mahasiswa
    //Get localhost:8000/mahasiswa/id
  }