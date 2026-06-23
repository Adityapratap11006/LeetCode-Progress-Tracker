const express=require("express");
const cors=require("cors");
const app=express();
const authRoutes=require("./routes/authRoutes")
const problemRoutes = require("./routes/problemRoutes");
const studyListRoutes = require("./routes/studyListRoutes");
const revisionRoutes = require("./routes/revisionRoutes");

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/studylists", studyListRoutes);
app.use("/api/revisions", revisionRoutes);
module.exports=app;