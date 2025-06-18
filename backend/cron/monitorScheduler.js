import cron from 'node-cron';
import axios from 'axios';
import MonitoredAPI from '../model/MonitoredAPI.js';
import ApiLog from '../model/apilog.js';

cron.schedule("*/5 * * * *", async()=>{
    console.log("Running API monitoring job...");

    try {
        const monitoredApis = await MonitoredAPI.find({monitor: true});

        for(const api of monitoredApis){
            const start = Date.now();

            try {
                const response = await axios.get(api.url, { responseType: "json"});
                const responseTime = Date.now() - start;

                //Log to API log
                await ApiLog.create({
                    url: api.url,
                    statusCode: response.status,
                    responseTime
                });
                //update MonitoredAPI snapshot
                await MonitoredAPI.updateOne(
                    { url: api.url},
                    {
                        $set:{
                            statusCode: response.status,
                            error: null,
                            lastTestedAt: new Date()
                        }
                    }
                );
                console.log(`${api.url} responded with status ${response.status}`);
            } catch (error) {
                const responseTime = Date.now() - start;
                const statusCode = err.response?.status || 500;

                //Log to ApiLog(failure)
                await ApiLog.create({
                    url: api.url,
                    statusCode,
                    responseTime,
                    error: err.message
                });

                //Update MonitoredAPI snapshot & increment failure count

                await MonitoredAPI.updateOne(
                    {url: api.url},
                    {
                        $set:{
                            statusCode,
                            error: error.message,
                            lastTestedAt: new Date()
                        },
                        $inc:{failureCount: 1}
                    }
                );
                console.error(`${api.url} failed: ${error.message}`);

            }
        }
    } catch (error) {
        console.error("Failed to fetch Monitored APIS:", err.message);
    }
});

