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

function ErrorTypeChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Error Count",
        data: [],
        backgroundColor: "#FF9800",
        borderRadius: 6,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const res = await axios.get("/api/data/error-distribution");
        const labels = res.data.map((entry) => entry._id || "Unknown");
        const data = res.data.map((entry) => entry.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Error Count",
              data,
              backgroundColor: "#FF9800",
              borderRadius: 6,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching error types:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto h-full">
      <Bar data={chartData} options={{ indexAxis: "y" }} />
    </div>
  );
}

export default ErrorTypeChart;
