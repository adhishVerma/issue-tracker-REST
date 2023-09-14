const mongoose = require("mongoose");


const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`mongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
