const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
require("dotenv").config();
const api = require("./api");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("assets"));
app.use(express.static(__dirname + "/"));

//Api Routes
app.use("/api", api);

//Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

app.listen(PORT, () => {
  console.log(`Oracle Server started at port: ${PORT}`);
});
