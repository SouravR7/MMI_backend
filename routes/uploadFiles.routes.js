let express = require("express");
let router = express.Router();
const readXlsxFile = require("read-excel-file/node");
const csvtojson = require("csvtojson");
const { data_Collection } = require("../connector");
let uploadFile = require("../middlewares/upload");

router.post(
  "/uploadExcelFile",
  uploadFile.single("uploadFile"),
  async (req, res) => {
    try {
      console.log(req.file);
      const { admin_id } = req.body;
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }
      importFile("./public" + "/uploads/" + req.file.filename);
      function importFile(filePath) {
        //  Read Excel File to Json Data
        //var arrayToInsert = [];
        let insertedObj = {
          admin_id: admin_id,
          fileName: req.file.filename,
          fileData: [],
        };
        readXlsxFile(filePath).then((rows) => {
          // skip header
          rows.shift();
          rows.shift();
          rows.shift();

          let tutorials = [];

          rows.forEach((row) => {
            //console.log(row);
            if (row[0] !== null && rows[0] !== "UID") {
              let newObj = {
                UID: parseInt(row[0]),
                type: row[1],
                subType: row[2],
                command: row[3],
                notes: row[4],
              };

              insertedObj.fileData.push(newObj);
            }
          });

          console.log(insertedObj);
          //inserting into the table student
          data_Collection
            .create(insertedObj)
            .then(() => {
              res.status(200).send({
                status: 200,
                error: false,
                message: "Uploaded the file successfully: " + req.file.filename,
              });
            })
            .catch((error) => {
              res.status(500).send({
                message: "Fail to import data into database!",
                errorMsg: error.message,
                status: 500,
                error: true,
              });
            });
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
);

router.post("/getFileData", async (req, res) => {
  try {
    const { admin_id } = req.body;
    console.log(admin_id);
    if (admin_id) {
      data_Collection
        .find({ admin_id: parseInt(admin_id) })
        .then((data) => {
          res.status(200).send({
            status: 200,
            error: false,
            data: data.length > 1 ? data : data[0],
          });
        })
        .catch((err) =>
          res
            .status(404)
            .json({ errorMsg: err.message, status: 500, error: true })
        );
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
