const { Schema, mongoose } = require("mongoose");
const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  isAdmin: {
    type: Boolean,
    default: false,
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
