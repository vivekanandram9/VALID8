import express, { Router } from "express";
import axios from "axios";
import ApiLog from "../model/apilog.js";
import passport from "passport";

const router = express.Router();


  

router.post("/", passport.authenticate("jwt", { session: false }), async(req , res ) => {
    console.log("🔥 /api/test hit");
    console.log("Payload received:", req.body);
    const {
        url, method = "GET", headers = {}, params = {}, data = null, saveResult = false
    } = req.body;

    console.log("recieved test payload:" , req.body);

    const start = Date.now();
    try{
        const response = await axios({
            url,
            method,
            headers,
            params,
            data,
            validateStatus: () => true
        });
        const responseTime = Date.now() - start;
        //log in MongoDB
       /* await ApiLog.create({
            url,
            statusCode: response.status,
            responseTime
        });*/
        if(saveResult) {
            await ApiLog.create({
                userId: req.user._id,
                url,
                statusCode: response.status,
                responseTime,
                error: response.status >= 400 ? `Error ${response.status}` : undefined
            });
        }

        res.status(response.status).json({
            status: response.status,
            data: response.data
        });
    } catch (err) {
        const responseTime = Date.now() - start;

        //log failure
        /*await ApiLog.create({
            url,
            statuscode: err.response?.status || 500,
            responseTime,
            error: err.message
        });*/
        if(saveResult){
            await ApiLog.create({
                userId: req.user._id,
                url,
                statusCode: err.response?.status || 500,
                responseTime,
                error: err.message
            });
        }

        res.status(500).json({error: err.message});
    }
});

export default router;