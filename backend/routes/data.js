import express from 'express';
import ApiLog from '../model/apilog.js';

const router = express.Router();
// GET /api/stats/response-times?url=<optional>
router.get('/response-times', async (req, res) =>{
    
    try {
        const {url} = req.query;

        const matchStage = url ? {url} : {}; //filter if specific api is selected
        const data = await ApiLog.aggregate([
            {$match: matchStage},
            {
                $group: {
                    _id:{
                        date: {
                            $dateToString:{
                                format: "%Y-%m-%d %H:%M", // group by minute
                                date: "$createdAt"
                            }
                        },
                        url: "$url"
                    },
                    avgResponseTime: {$avg: "$responseTime"},
                    requestCount: {$sum: 1}
                }
            },
            {$sort: {"_id.date": 1}}
        ]);
        res.json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
});
router.get('/failures', async (req, res) => {
  try {
    const { url } = req.query;
    const matchStage = {
      ...(url && { url }),
      statusCode: { $gte: 400 }
    };

    const result = await ApiLog.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d %H:%M",
                date: "$createdAt"
              }
            },
            url: "$url"
          },
          failureCount: { $sum: 1 }
        }
      },
      { $sort: { "_id.date": 1 } }
    ]);

    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get('/success-ratio', async (req, res) => {
  try {
    const { url } = req.query;
    const matchStage = url ? { url } : {};

    const result = await ApiLog.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            success: { $lt: ["$statusCode", 400] }, // true = success, false = fail
          },
          count: { $sum: 1 }
        }
      }
    ]);

    const formatted = {
      success: result.find(r => r._id.success === true)?.count || 0,
      failure: result.find(r => r._id.success === false)?.count || 0
    };

    res.json(formatted);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get('/recent-logs', async (req, res) => {
  try {
    const { url } = req.query;
    const filter = url ? { url } : {};

    const logs = await ApiLog.find(filter)
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    res.json(logs);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



router.get('/test2',(req, res) =>{
    console.log("/test-hit");
    res.send("It works");
});

export default router;