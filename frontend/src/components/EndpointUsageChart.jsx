import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function EndpointUsageChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Usage Count",
        data: [],
        backgroundColor: "#2196F3",
        borderRadius: 6,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const res = await axios.get("/api/data/endpoint-usage");
        const labels = res.data.map((entry) => entry._id);
        const data = res.data.map((entry) => entry.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Usage Count",
              data,
              backgroundColor: "#2196F3",
              borderRadius: 6,
            },
          ],
        });
      } catch (err) {
        console.error("Failed to fetch endpoint usage:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto h-full">
      <Bar data={chartData} />
    </div>
  );
}

export default EndpointUsageChart;
