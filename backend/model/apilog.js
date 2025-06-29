import { mongoose } from "mongoose";
import {model, Schema } from "mongoose";

const apiLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    url: { type: String, required: true},
    statusCode: Number,
    responseTime: Number,
    error: String,
    //checkedAt: {type: Date, default: Date.now}
}, { timestamps: true});

const ApiLog = mongoose.model("ApiLog", apiLogSchema);

export default ApiLog;

