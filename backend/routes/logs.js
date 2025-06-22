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
router.get("/unique-urls", async (req, res) => {
    try {
        const uniqueUrls = await Apilog.distinct("url");
        res.json(uniqueUrls);
    } catch (error) {
        console.error("Error fetching unique URLs:", error.message);
        res.status(5000).json({error: "Failed to fetch unique API URLs"});
    }
});
router.get("/count", async (req, res) => {
    try{
        const totalLogs = await Apilog.countDocuments();
        res.status(200).json({ total: totalLogs});
    }catch(error){
        console.error("Error counting logs:", error.message);
        res.status(500).json({error: "Failed to count logs"});
    }
});
router.get("/failing-urls", async(req, res) => {
    try{
        const urls = await Apilog.aggregate([
            {$match: { statusCode: { $gte: 400}}},
            {$group: {_id: "$url"}}, //$gte= >=
        ]);
        res.json({ total: urls.length});
    }catch(error){
        console.error("Error fetching falling APIs:", error.message);
        res.status(500).json({error: "Failed to fetch failing API URLs"});
    }
});
export default router;