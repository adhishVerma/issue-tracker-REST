const express = require("express");
require("dotenv").config();
const issueRoutes = require("./routes/issueRoutes");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const teamRoutes = require("./routes/teamRoutes");
const job = require('./config/cron');
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require('./config/db')
const cors = require('cors');

// startign the cron job
job.start();

connectDB()

const app = express();


app.use(cors());
app.use(express.json());


app.use("/api/issues", issueRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/teams", teamRoutes);

// error middleware
app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => {
  console.log(`server started on port ${process.env.PORT}`);
});

