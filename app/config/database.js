const dbHost = process.env.DB_HOST
const dbName = process.env.DB_NAME

module.exports = {
  url : `mongodb://${dbHost}/${dbName}`
}

//- harus menggunakan 127.0.0.1 tidak bisa menggunakan localhost
//- url/(select datbase);
//- tidak perlu menambahkan 27017 lagi di url nya