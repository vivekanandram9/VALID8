import express from "express";
import ApiLog from "../model/apilog.js"
import MonitoredAPI from "../model/MonitoredAPI.js"
import passport from "passport";

const router = express.Router();

const formatTimeAgo = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    if(minutes < 1) return "Just now";
    if(minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if(hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
};

router.get("/",passport.authenticate("jwt", { session: false }), async(req, res) => {
    try {
        const userId = req.user._id;
        const totalTested = await ApiLog.countDocuments({userId});
        const monitored = await MonitoredAPI.countDocuments({ userId, monitor: true});
        const lastFailureEntry = await ApiLog.findOne({ userId, statusCode: {$gte: 400}}).sort({ createdAt: -1});
        const lastFailure = lastFailureEntry ? formatTimeAgo(lastFailureEntry.createdAt) : "N/A";

        const recentLogs = await ApiLog.find({ userId}).sort({createdAt: -1}).limit(100);
        const successful = recentLogs.filter(log => log.statusCode < 400).length;
        const uptime = recentLogs.length? `${((successful / recentLogs.length) *100).toFixed(1)}%` : "N/A";

        res.json({
            totalTested,
            monitored,
            lastFailure,
            uptime
        });
    } catch (error) {

        console.error("Error generating stats:", err);
        res.status(500).json({ error: "Failed to fetch stats"});
        
    }
});

export default router;