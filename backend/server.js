const express = require("express");
require("dotenv").config();
const bugRoutes = require("./routes/bugRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require('./config/db')

connectDB()

const app = express();


app.use(express.json());
app.use("/api/bugs", bugRoutes);

// error middleware
app.use(errorHandler);

app.listen(5000, () => {
  console.log(`server started on port 5000`);
});
