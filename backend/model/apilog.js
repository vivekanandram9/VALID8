import { mongoose } from "mongoose";
import {model, Schema } from "mongoose";

const apiLogSchema = new mongoose.Schema({
    url: { type: String, required: true},
    statusCode: Number,
    responseTime: Number,
    error: String,
    checkedAt: {type: Date, default: Date.now}
});

const ApiLog = mongoose.model("ApiLog", apiLogSchema);

export default ApiLog;

