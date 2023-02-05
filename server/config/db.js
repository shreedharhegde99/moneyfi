const { connect, default: mongoose } = require("mongoose");
require("dotenv").config();

const localDbUrl = `mongodb://127.0.0.1:27017/moneyfi?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2`;

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  return await connect(process.env.DB_URL || localDbUrl)
    .then(() => console.log(`CONNECTED TO DATABASE`))
    .catch((e) => console.log(`CONNECTION TO DATABASE FAILED`, e.message));
};

module.exports = connectDB;
