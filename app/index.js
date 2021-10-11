const express = require("express");
const cors = require("cors");
require("dotenv").config();
let app = express();

//Express being able to read JSON
app.use(express.json())

//Cross Origin Resource Sharing (All)
app.use(
  cors({
    origin: "*",
  })
);

//Pet route
require("./routes/petroute")(app);


//Server Port
app.listen(process.env.DB_PORT, (err) => {
  if (err) return console.log(`Cannot listen on Port: ${process.env.DB_PORT}`);
  console.log(`Server is listening on: http://localhost:${process.env.DB_PORT}/`);
});