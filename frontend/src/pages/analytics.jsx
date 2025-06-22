import React, {useEffect, useState } from "react";
import axios from "axios";
import SuccessPieChart from "../components/SuccessPieChart.jsx";
import ResponseTimeChart from "../components/responseTimeChart.jsx";
import FailureBarChart from "../components/failureBarChart.jsx";
import RecentLogsTable from "../components/recentLogsTable.jsx";


function Analytics() {
  const [selectedApi, setSelectedApi] = useState("");
  const [totalApis, setTotalApis] = useState(0);
const [failingApis, setFailingApis] = useState(0);
const [avgResponseTime, setAvgResponseTime] = useState("--");
const [totalLogs, setTotalLogs] = useState(0);
 useEffect(() => {
  const fetchSummary = async () => {
    try {
      //Total APis
      const urlRes = await axios.get("https://valid8-oypy.onrender.com/api/logs/unique-urls");
      setTotalApis(urlRes.data.length || 0);
      //Failing Apis
      const logsRes = await axios.get("https://valid8-oypy.onrender.com/api/logs/failing-urls");
      const logsCount = logsRes.data.total || 0;
     
      setFailingApis(logsCount);

      //Average response time
      const timeRes = await axios.get("https://valid8-oypy.onrender.com/api/data/response-times");
      const allTimes = timeRes.data.map((t) => t.avgResponseTime);
      const avg = allTimes.length ? (allTimes.reduce((a,b) => a + b,0) / allTimes.length).toFixed(2): "--";
      setAvgResponseTime(avg);

      //total logs
      const logCount = await axios.get("https://valid8-oypy.onrender.com/api/logs/count");
      setTotalLogs(logCount.data.total || 0);
    } catch (err) {
      console.error("failed to fetch summary data:", err.message);
    }
  };
  fetchSummary();
 },[]);
 
  return (
    <div className="p-6 bg-background min-h-screen text-foreground pl-[11rem]">
      <h1 className="text-3xl font-bold mb-4">📊 Analytics Dashboard</h1>

      {/* Summary Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-glass border border-textSecondary p-4 rounded-lg shadow-glow">
          <h2 className="text-sm text-textSecondary">Total APIs</h2>
          <p className="text-2xl font-semibold">{totalApis}</p>
        </div>
        <div className="bg-glass border border-textSecondary p-4 rounded-lg shadow-glow">
          <h2 className="text-sm text-textSecondary">Failing APIs</h2>
          <p className="text-2xl font-semibold">{failingApis}</p>
        </div>
        <div className="bg-glass border border-textSecondary p-4 rounded-lg shadow-glow">
          <h2 className="text-sm text-textSecondary">Avg Response Time</h2>
          <p className="text-2xl font-semibold">{avgResponseTime}</p>
        </div>
        <div className="bg-glass border border-textSecondary p-4 rounded-lg shadow-glow">
          <h2 className="text-sm text-textSecondary">Total Logs</h2>
          <p className="text-2xl font-semibold">{totalLogs}</p>
        </div>
      </div>

      {/* Chart Sections (placeholders) */}
      <div className="space-y-8">
        <div className="bg-glass p-4 rounded-lg border border-textSecondary shadow-glow">
          <h2 className="text-xl font-semibold text-lred mb-4">Success vs Failure</h2>

          <input
            type="text"
            placeholder="Enter API URL to filter (optional)"
            className="w-full mb-4 px-3 py-2 border border-textSecondary rounded-md bg-transparent text-foreground placeholder-textSecondary"
            value={selectedApi}
            onChange={(e) => setSelectedApi(e.target.value)}
          />

          <SuccessPieChart apiUrl={selectedApi} />
        </div>


        <div className="bg-glass p-4 rounded-lg border border-textSecondary shadow-glow">
          <h2 className="text-xl font-semibold text-lred mb-2">Response Times</h2>
          <input
            type="text"
            placeholder="Enter API URL to filter (optional)"
            className="w-full mb-4 px-3 py-2 border border-textSecondary rounded-md bg-transparent text-foreground placeholder-textSecondary"
            value={selectedApi}
            onChange={(e) => setSelectedApi(e.target.value)}
          />
           <ResponseTimeChart apiUrl={selectedApi}/>
        </div>

        <div className="bg-glass p-4 rounded-lg border border-textSecondary shadow-glow">
          <h2 className="text-xl font-semibold text-lred mb-2">Failure History</h2>
          <input
            type="text"
            placeholder="Enter API URL to filter (optional)"
            className="w-full mb-4 px-3 py-2 border border-textSecondary rounded-md bg-transparent text-foreground placeholder-textSecondary"
            value={selectedApi}
            onChange={(e) => setSelectedApi(e.target.value)}
          />
          <FailureBarChart apiUrl={selectedApi}/>
        </div>

        <div className="bg-glass p-4 rounded-lg border border-textSecondary shadow-glow">
          <h2 className="text-xl font-semibold text-lred mb-2">Recent Logs</h2>
          <RecentLogsTable />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
