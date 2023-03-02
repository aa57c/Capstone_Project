const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config({path: './config.env'});
console.log(process.env)
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer();
  console.log(`Server is running on port: ${port}`);
});
