
import express from 'express';
import passport from 'passport';
import ApiLog from '../model/apilog.js';

const router = express.Router();


router.get('/response-times', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { url } = req.query;
    const matchStage = {
      userId: req.user._id,
      ...(url && { url }),
    };

    const data = await ApiLog.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d %H:%M", date: "$createdAt" } },
            url: "$url",
          },
          avgResponseTime: { $avg: "$responseTime" },
          requestCount: { $sum: 1 }
        }
      },
      { $sort: { "_id.date": 1 } }
    ]);

    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get('/failures', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { url } = req.query;
    const matchStage = {
      userId: req.user._id,
      ...(url && { url }),
      statusCode: { $gte: 400 }
    };

    const result = await ApiLog.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d %H:%M", date: "$createdAt" } },
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


router.get('/success-ratio', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { url } = req.query;
    const matchStage = {
      userId: req.user._id,
      ...(url && { url }),
    };

    const result = await ApiLog.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: { success: { $lt: ["$statusCode", 400] } },
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


router.get('/recent-logs', passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { url } = req.query;
    const filter = {
      userId: req.user._id,
      ...(url && { url })
    };

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


router.get("/endpoint-usage", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const data = await ApiLog.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: "$url",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/error-distribution", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const data = await ApiLog.aggregate([
      { $match: { userId: req.user._id, error: { $ne: null } } },
      {
        $group: {
          _id: "$error",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/slow-responses", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const min = parseInt(req.query.min) || 1000;
    const data = await ApiLog.find(
      { userId: req.user._id, responseTime: { $gte: min } },
      { responseTime: 1, createdAt: 1, _id: 0 }
    ).sort({ createdAt: 1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



export default router;
