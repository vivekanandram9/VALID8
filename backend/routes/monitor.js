import express from "express";
import axios from "axios";
import MonitoredAPI from "../model/MonitoredAPI.js";
import passport from "passport";

const router = express.Router();

router.post("/",passport.authenticate("jwt", { session: false }), async(req, res) =>{
    console.log("incomming request body:", req.body);
    const {url, monitor, method} = req.body;

    if(!url){
        return res.status(400).json({error: "URL is required"});
    }

    const httpMethod = method || "GET";
    const start = Date.now();

    try{
        const response = await axios({
            method: httpMethod,
            url,
            timeout: 5000,
        });
        const responseTime = Date.now() - start;
        await MonitoredAPI.updateOne(
            { url, userId:req.user._id},
            {
                $set: {
                    userId:req.user._id,
                    monitor: monitor ?? false,
                    method: httpMethod,
                    statusCode: response.status,
                    responseTime,
                    error:"",
                    failureCount: 0,
                    lastTestedAt: new Date(),
                },
            },
            { upsert: true }
        );

        res.status(200).json({
            message: "API monitoring preferences saved.",
            statusCode: response.status,
            responseTime,
        });
    }catch(err){
        const responseTime = Date.now() - start;
        await MonitoredAPI.updateOne(
            { url, userId: req.user._id },
            {
                $set: {
                    userId:req.user._id,
                    monitor: monitor ?? false,
                    method: httpMethod,
                    statusCode: err.response?.status || 0,
                    responseTime,
                    error: err.message,
                    failureCount: 1,
                    lastTestedAt: new Date(),
                },
            },
            {upsert: true}
        );
        res.status(200).json({
            message: "API test failed, but preferences saved.",
            error: err.message,
            statusCode: err.response?.status || 0,
            responseTime,
        });
    }
});

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip =  (page -1) * limit;
        const monitored = await MonitoredAPI.find({userId: req.user._id})
            .sort({ lastTestedAt: -1})
            .skip(skip)
            .limit(limit);
        const total = await MonitoredAPI.countDocuments({userId: req.user._id});
        res.status(200).json({
            data : monitored,
            total,
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({error: " internal server error"});
    }
});

router.patch("/:id", passport.authenticate("jwt", { session: false }), async (req,res) => {
    const { id } = req.params;
    const { monitor } = req.body;

    try{
        const updated = await MonitoredAPI.findByIdAndUpdate(
            {_id: id, userId: req.user._id},
            { monitor },
            {new : true}
        );
        if(!updated){
            return res.status(404).json({ message: "API not found"});
        }
        res.status(200).json({ messgae: "Monitor status updated", data: updated});
    }catch(error){
        console.error("Monitor toggle error:", error);
        res.status(500).json({message: "failed to update monitor status"});
    }
});

export default router;