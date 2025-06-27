import express from "express";
import bcrypt from "bcryptjs";
import jwt from  "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import UserModel from "../model/user.js";

dotenv.config();

const router = express.Router();
console.log("✅ Auth router loaded");


//signup route

router.post("/signup", async(req, res) => {
    try {
        console.log("Signup request received:", req.body);
        const {name, email, password} =  req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if(existingUser) return res.status(400).json({ message : "User already exits"});

        //hash passoword

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //save user

        const newUser = new UserModel({name, email, password: hashedPassword});

        await newUser.save();
        return res.status(201).json({ message: "signup succesfull", newUser });

        //return success response

        {/*res.status(201).json({message: "User registered succesfully"});*/}
    } catch(error) {
        console.error("Signup Error:", error); // Log error in the server
        return res.status(500).json({ message: "Error signung up", error: error.message});
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {session: false}, (err, user, info) =>{
        if (err || !user){
            return res.status(400).json({ message: info ? info.message: "Login failed"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "2h"});

        return res.json({ message: "login succesful", token });
    })(req, res, next);
});

//middleware for protected routes
const authMiddleware = (req, res, next) => {
    const token = req.cookies.authToken;
    if(!token) return req.status(401).json({message: "Unauthorized"});

    jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return res.status(403).json({ message: "Forbidden"});
        req.user = decoded;
        next();
    });
};
router.get("/test", (req, res) => {
  res.send("✅ Simple route is working");
});

//protected route 
router.get("/Dashboard", passport.authenticate("jwt" , { session: false}), (req, res) => {
    res.json({ message: "Profile accessed", user: req.user});
})

//Logout Route
router.post("/logout", (req, res) => {
    res.clearCookie("authToken");
    res.json({message: "Logout Succesfull"});
});

router.get("/user", passport.authenticate("jwt", { session: false}), async (req, res) => {
    try {
        console.log("Decoded user from JWT:", req.user); // Check what it actually contains

        const userId = req.user.id || req.user._id; // ✅ Use whichever exists
        const user = await UserModel.findById(userId).select("name email");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("Found user in DB:", user);
        res.json({
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Failed to fetch user info" });
    }
});

router.get("/debug-token", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});


export default router;