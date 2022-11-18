const { Schema, mongoose } = require("mongoose");
//admin_id -> 1 : super_admin , 2 : admin

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  admin_type: {
    type: Number,
    default: 2,
  },
  password: String,
});

var alarmSchema = new Schema({
  UID: Number,
  type: String,
  subType: String,
  command: String,
  notes: String,
});

const dataSchema = new Schema({
  admin_id: {
    type: String,
  },
  fileName: {
    type: String,
  },
  fileData: {
    type: [alarmSchema],
  },
});

exports.userSchema = userSchema;
exports.dataSchema = dataSchema;
