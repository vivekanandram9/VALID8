import cron from 'node-cron';
import axios from 'axios';
import MonitoredAPI from '../model/MonitoredAPI.js';
import ApiLog from '../model/apilog.js';

cron.schedule("*/5 * * * *", async() => {
    console.log("running API monitoring job...");

    try{
        const monitoredApis = await MonitoredAPI.find({monitor: true});

        for(const api of monitoredApis){
            const start = Date.now();
            try{
                const response = await axios.get(api.url, {responsetype: "json"});
                const responseTime = Date.now() - start;
                
                await ApiLog.create({
                    url: api.url,
                    stutusCode: response.status,
                    responseTime
                    
                });

                await MonitoredAPI.updateOne(
                    {url: api.url},
                    { $set: { lastTestedAt: new DataView()}}
                );
                console.log(`API responded with status ${response.status}`);
            }catch (err) {
                const responseTime = Date.now() - start;

                // save failure log
                await ApiLog.create({
                    url: api.url,
                    statusCode: err.response?.status || 500,
                    responseTime,
                    error: err.message
                });
                console.error(`Error : ${err.message}`);
            }
        }
    } catch (err){
        console.error(" Failed to fetch monitored APIs:", err);
    }
});