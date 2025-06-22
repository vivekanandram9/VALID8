import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function ResponseTimeChart({ apiUrl = "" }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Avg Response Time (ms)",
        data: [],
        fill: false,
        borderColor: "#FF4D4D",
        backgroundColor: "#FF4D4D",
        tension: 0.3,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = apiUrl
          ? `https://valid8-oypy.onrender.com/api/data/response-times?url=${encodeURIComponent(apiUrl)}`
          : "https://valid8-oypy.onrender.com/api/data/response-times";

        const res = await axios.get(url);
        const labels = res.data.map((entry) => entry._id.date);
        const data = res.data.map((entry) => entry.avgResponseTime.toFixed(2));

        setChartData({
          labels,
          datasets: [
            {
              label: "Avg Response Time (ms)",
              data,
              fill: false,
              borderColor: "#FF4D4D",
              backgroundColor: "#FF4D4D",
              tension: 0.3,
            },
          ],
        });
      } catch (err) {
        console.error("Failed to fetch response times:", err.message);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Line data={chartData} />
    </div>
  );
}

export default ResponseTimeChart;
