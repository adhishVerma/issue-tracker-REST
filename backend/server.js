const express = require("express");
const dotenv = require("dotenv");
const app = express();
const bugRoutes = require("./routes/bugRoutes");
const { errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());
app.use("/api/bugs", bugRoutes);

// error middleware
app.use(errorHandler);

app.listen(5000, () => {
  console.log(`server started on port 5000`);
});
