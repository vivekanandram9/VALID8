import mongoose from "mongoose";

const monitoredApiSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    url: {type: String, required: true, unique:true},
    method: { type: String, enum: ['GET', 'POST', 'PUT', 'DELETE'], default: 'GET' },
    statusCode: {type: Number},
    error: { type: String },
    failureCount: { type: Number, default: 0 },
    monitor: {type: Boolean, default: false},
    lastTestedAt: {type: Date}
});

//indexing for efficient querying of monitored APIs
monitoredApiSchema.index({ monitor: 1 });

const MonitoredAPI = mongoose.model("MonitoredAPI", monitoredApiSchema);

export default MonitoredAPI;