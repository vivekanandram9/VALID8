import express from "express";
import Apilog from "../model/apilog.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page -1 ) * limit;

        const logs = await Apilog.find()
           .sort({ createdAt: -1})
           .skip(skip)
           .limit(limit);
        const total = await Apilog.countDocuments();
        res.status(200).json({
            data : logs,
            total,
        });
    } catch (error) {

        console.error("Error fetching logs:", error);
        res.status(500).json({ error: "Internal server error"});
        
    }
});
export default router;