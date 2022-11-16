const mongoose = require("mongoose");
const { userSchema, dataSchema } = require("./schema");
const Mogodb_String =
  "mongodb+srv://SouravNss:Souravrouth@cluster0.t0vyzew.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(Mogodb_String, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Established"))
  .catch((err) => console.log("error while connect !!", err));

const user_Collection = mongoose.model("user_Data", userSchema);
const data_Collection = mongoose.model("xlxs_Data", dataSchema);

exports.user_Collection = user_Collection;
exports.data_Collection = data_Collection;
