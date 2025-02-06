import express from "express";
import bcrypt from "bcryptjs";
import jwt from  "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";

import UserModel from "../model/user.js";

dotenv.config();

const app = express();

//signup route

app.post("/signup", async(req, res) => {
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

app.post("/login", (req, res, next) => {
    passport.authenticate("local", {session: false}, (err, user, info) =>{
        if (err || !user){
            return res.status(400).json({ message: info ? info.message: "Login failed"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: "2h"});

        return res.json({ message: "login succesful", token });
    })(req, res, next);
});
//protected route 
app.get("/profile", passport.authenticate("jwt" , { session: false}), (req, res) => {
    res.json({ message: "Profile accessed", user: req.user});
})

export default app;