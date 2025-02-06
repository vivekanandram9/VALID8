import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();
import configurePassport from "./config/passport.js";
import cors from "cors";

import authRoutes from "../backend/routes/auth.js";





const app = express();

//Middleware
app.use(cors());
app.use(express.json()); // similar to body-parser

//initializing passport
configurePassport(passport);
app.use(passport.initialize());

//routes
app.use("/api/auth", authRoutes);


app.get("/", (req,res) => {
    res.send("Hello world!");
});

// function to  to connect MongoDb

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDb connected Succesfully");
    } catch(error){
        console.error("MongoDB connection failed:", error);
        process.exit(1); //exite process on failure
    }
};

//start server
const startServer = async () => {
    await connectDB(); // Connect to MongoDB before starting the server
    app.listen(5000, () => console.log("Server running on port 5000"));
};

startServer();