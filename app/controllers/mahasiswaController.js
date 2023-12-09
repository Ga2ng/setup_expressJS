const db = require("../models");
const Mahasiswa = db.mahasiswa;

exports.create = (req,res) => {
  req.body.tanggal_lahir = new Date(req.body.tanggal_lahir)

  Mahasiswa.create(req.body)
    .then(() => res.send(
      {
        message: "succes create data",
        data: req.body
      }
    ))
    .catch(err => res.status(500).send({message: err.message}));
}

exports.findAll = (req,res) => {
  Mahasiswa.find()
    .then(data => res.send(data))
    .catch(err => res.status(500).send({message : err.message}))
  // res.json({message : "findALl mahasiswa routess"})
}

exports.show = (req,res) => {
  const id = req.params.id;

  Mahasiswa.findById(id)
    .then(data => res.send( data))
    .catch(err => res.status(500).send({message : err.message}))
}

exports.update = (req,res) => {
  const id = req.params.id;
  
  req.body.tanggal_lahir = new Date(req.body.tanggal_lahir)

  Mahasiswa.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
      if(!data){
        res.status(404).send({message: "Failed Update data"})
      }
      res.send({message: "Update succes"})
    })
    .catch(err => res.status(500).send({message: err.message}));
  

}

// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Mahasiswa.findByIdAndRemove(id)
//     .then(data => {
//       if (!data) {
//         res.status(404).send({ message: "Failed to delete data" });
//       }
//       res.send({ message: "Delete successful" });
//     })
//     .catch(err => res.status(500).send({ message: err.message }));
// };

exports.delete = (req, res) => {
  const id = req.params.id;

  Mahasiswa.findOneAndDelete({_id : id})
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Failed to delete data" });
      }
      res.send({ message: "Delete successful" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};
