const express=require("express");
const app=express();
const authRoutes=require("./routes/authRoutes")
const problemRoutes = require("./routes/problemRoutes");

app.use(express.json());
app.use("/api/problems", problemRoutes);
app.use("/api/auth", authRoutes);
module.exports=app;