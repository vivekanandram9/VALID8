import express from "express";
import MonitoredAPI from "../model/MonitoredAPI.js";

const app = express();

app.post("/", async (req, res) =>{
    const {url, name, monitor } = req.body;

    if(!url){
        return res.status(400).json({error: "URL is required"});
    }
    try{
        await MonitoredAPI.updateOne(
            {url},
            {
                $set:{
                    name: name || "Untitled API",
                    monitor,
                    lastTestedAt: new Date()
                }
            },
            {upsert: true}
        );

        res.status(200).json({ message: "API monitoring preference saved."});
    } catch(err){
        console.error("Error saving monitored API:", err);
        res.status(500).json({ error: "Failed to save  monitored API"});
    }
});

export default app;