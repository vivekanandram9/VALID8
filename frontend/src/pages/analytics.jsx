import React, { useState } from "react";
import SuccessPieChart from "../components/SuccessPieChart.jsx";

function Analytics() {
  const [selectedApi, setSelectedApi] = useState("");
  return (
    <div className="p-6 bg-background min-h-screen text-foreground pl-[11rem]">
      <h1 className="text-3xl font-bold mb-4">📊 Analytics Dashboard</h1>

      {/* Summary Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-glass border border-textSecondary p-4 rounded-lg shadow-glow">
          <h2 className="text-sm text-textSecondary">Total APIs</h2>
          <p className="text-2xl font-semibold">--</p>
        </div>
        <div className="bg-glass border border-textSecondary p-4 rounded-lg shadow-glow">
          <h2 className="text-sm text-textSecondary">Failing APIs</h2>
          <p className="text-2xl font-semibold">--</p>
        </div>
        <div className="bg-glass border border-textSecondary p-4 rounded-lg shadow-glow">
          <h2 className="text-sm text-textSecondary">Avg Response Time</h2>
          <p className="text-2xl font-semibold">--</p>
        </div>
        <div className="bg-glass border border-textSecondary p-4 rounded-lg shadow-glow">
          <h2 className="text-sm text-textSecondary">Total Logs</h2>
          <p className="text-2xl font-semibold">--</p>
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
          <p className="text-textSecondary">Line chart will go here</p>
        </div>

        <div className="bg-glass p-4 rounded-lg border border-textSecondary shadow-glow">
          <h2 className="text-xl font-semibold text-lred mb-2">Failure History</h2>
          <p className="text-textSecondary">Bar chart will go here</p>
        </div>

        <div className="bg-glass p-4 rounded-lg border border-textSecondary shadow-glow">
          <h2 className="text-xl font-semibold text-lred mb-2">Recent Logs</h2>
          <p className="text-textSecondary">Table will go here</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
