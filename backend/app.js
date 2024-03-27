require("dotenv").config();

const cors = require("cors");
const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
app.use(cors());

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on("connected", () => {
  console.log("successfuly connected to mongoDB");
});
mongoose.connection.on("error", () => {
  console.log("some error occured while connecting mongoDB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./src/routes/signUp"));
app.use(require("./src/routes/login"));
app.use(require("./src/routes/changePrice"));
app.use(require("./src/routes/addInventory"));
app.use(require("./src/routes/updateQuantity"));
app.use(require("./src/routes/generateBill"));
app.use(require("./src/routes/itemsSold"));

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
