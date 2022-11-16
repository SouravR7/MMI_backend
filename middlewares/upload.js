const multer = require("multer");

// const excelFilter = (req, file, cb) => {
//   if (
//     file.mimetype.includes("excel") ||
//     file.mimetype.includes("spreadsheetml")
//   ) {
//     cb(null, true);
//   } else {
//     cb("Please upload only excel file.", false);
//   }
// };

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __basedir + "/public/uploads");
//   },
//   filename: (req, file, cb) => {
//     console.log(file.originalname);
//     cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
//   },
// });

// var uploadFile = multer({ storage: storage, fileFilter: excelFilter });

var excelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads"); // file added to the public folder of the root directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var uploadFile = multer({ storage: excelStorage });

module.exports = uploadFile;
