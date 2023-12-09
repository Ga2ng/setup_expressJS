require('dotenv').config();
const PORT = process.env.PORT || 7000;
const express = require('express');
const cors = require('cors');
const db = require('./app/models');
const app = express();


const corsOption = {
  origin: "*"
};

//register cors
app.use(cors(corsOption));
app.use(express.json());


//connect to database
db.mongoose.connect(db.url)
.then(() => console.log("database (mongoDB) connected "))
.catch((err  => {
  console.log(`Failed to connect ${err.message}`);
  process.exit();
}) )

//middleware authentication
const authMiddleware = require('./app/middleware/AuthMiddleware');
app.use(['/mahasiswa', '/dosen'], authMiddleware)

//make route
app.get("/", (req,res) => {
  // res.json({message : "Hellow world"})
  res.send("Login Page")
});
app.get("/dosen", (req,res) => {
  res.send("dosen page")
});


//register route
const authController = require("./app/controllers/authController")
require("./app/routes/mahasiswa.routes")(app);
app.post("/login", authController.login)

//connect to server
app.listen(PORT, ()=> console.log(`server start on port ${PORT}`));

//// Handle unhandled promise rejections and uncaught exceptions
process.on('unhandledRejection', (err) => {
  console.log(`Unhandled Rejection: ${err.message}`);
  // Handle the error here, you might want to log it or do something else
});

process.on('uncaughtException', (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
  // Handle the error here, you might want to log it or do something else
  process.exit(1); // Exit the process after uncaught exception
});