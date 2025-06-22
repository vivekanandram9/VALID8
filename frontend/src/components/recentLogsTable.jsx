import React, { useEffect, useState } from "react";
import axios from "axios";

function RecentLogsTable({ apiUrl = "" }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const url = apiUrl
          ? `https://valid8-oypy.onrender.com/api/data/recent-logs?url=${encodeURIComponent(apiUrl)}`
          : "https://valid8-oypy.onrender.com/api/data/recent-logs";

        const res = await axios.get(url);
        setLogs(res.data || []);
      } catch (err) {
        console.error("Error fetching logs:", err.message);
      }
    };

    fetchLogs();
  }, [apiUrl]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border border-textSecondary rounded-lg">
        <thead className="bg-glass text-left border-b border-textSecondary">
          <tr>
            <th className="p-2">Time</th>
            <th className="p-2">URL</th>
            <th className="p-2">Status</th>
            <th className="p-2">Response Time</th>
            <th className="p-2">Error</th>
          </tr>
        </thead>
        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center text-textSecondary">
                No logs found.
              </td>
            </tr>
          ) : (
            logs.map((log, index) => (
              <tr
                key={index}
                className="border-t border-textSecondary hover:bg-glass/40"
              >
                <td className="p-2 text-sm text-textSecondary">
                  {new Date(log.createdAt).toLocaleString()}
                </td>
                <td className="p-2 break-all text-sm">{log.url}</td>
                <td className={`p-2 text-sm font-bold ${log.statusCode >= 400 ? "text-red-500" : "text-green-500"}`}>
                  {log.statusCode}
                </td>
                <td className="p-2 text-sm">{log.responseTime} ms</td>
                <td className="p-2 text-sm text-red-300">
                  {log.error || "--"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RecentLogsTable;
