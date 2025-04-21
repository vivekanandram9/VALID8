import mongoose from "mongoose";

const moniteredApiSchema = new mongoose.Schema({
    url: {type: String, required: true, unique:true},
    name: {type: String},
    monitor: {type: Boolean, default: false},
    lastTestedAt: {type: Date}
});

const MonitoredAPI = mongoose.model("MoniteredAPI", moniteredApiSchema);

export default MonitoredAPI;