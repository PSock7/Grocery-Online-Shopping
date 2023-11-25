const mongoose = require("mongoose");
const { DB_URL } = require("../config");
const colors = require("colors");
module.exports = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(colors.america("Db Connected"));
  } catch (error) {
    console.log("Error ============");
    console.log(error);
  }
};
