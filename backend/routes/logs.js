import express from "express";
import Apilog from "../model/apilog.js";

const router = express.Router();

router.get("/", async(req, res) =>{
    try {
        const logs = await Apilog.find().sort({ createdAt: -1}).limit(100);
        res.status(200).json(logs);
    } catch (error) {
        console.error("Failed to fetch logs:", error);
        res.status(500).json({ error: "Internal server error"});
        
    }
});

export default router;