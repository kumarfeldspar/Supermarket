require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
app.use(cors());

require("./src/models/user");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./src/routes/auth"));
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("successfuly connected to mongoDB");
});
mongoose.connection.on("error", () => {
  console.log("some error occured");
});

// app.get("/",(req,res)=>{
//     res.send("Hello");
// })

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
