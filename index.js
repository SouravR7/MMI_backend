const express = require("express");
const { user_Collection, data_Collection } = require("./connector");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
var cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 7000;
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");

  next();
});

app.get("/", (req, res) => {
  res.send("Hello MMI!");
});

app.use("/upload", require("./routes/uploadFiles.routes"));

app.listen(port, () => {
  console.log(`Dev MMI listening on port ${port}!`);
});
