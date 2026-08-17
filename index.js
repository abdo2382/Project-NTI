require("dotenv").config();

const path = require("path");
const express = require("express");
const dbConnect = require("./config/db-connect");
const taskRoutes = require("./routes/task-routes");
const authRoutes = require("./routes/auth-routes");

const app = express();

// Parse incoming JSON bodies
app.use(express.json());

// Connect to MongoDB Atlas
dbConnect();

// Serve uploaded files (task attachments) as static assets
app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));

// Auth routes (signup, login)
app.use("/api/v1/auth", authRoutes);

// Task routes (all require a logged-in user)
app.use("/api/v1/tasks", taskRoutes);

// Simple health check
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "askFlow API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
