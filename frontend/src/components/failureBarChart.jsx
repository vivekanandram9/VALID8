import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function FailureBarChart({ apiUrl = "" }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Failures",
        data: [],
        backgroundColor: "#F44336",
        borderRadius: 6,
      },
    ],
  });

  useEffect(() => {
    const fetchFailures = async () => {
      try {
        const url = apiUrl
          ? `/api/data/failures?url=${encodeURIComponent(apiUrl)}`
          : "/api/data/failures";

        const res = await axios.get(url);
        const labels = res.data.map((entry) => entry._id.date);
        const data = res.data.map((entry) => entry.failureCount);

        setChartData({
          labels,
          datasets: [
            {
              label: "Failures",
              data,
              backgroundColor: "#F44336",
              borderRadius: 6,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching failure data:", err.message);
      }
    };

    fetchFailures();
  }, [apiUrl]);

  return (
    <div className="w-full max-w-4xl mx-auto h-full">
      <Bar data={chartData} />
    </div>
  );
}

export default FailureBarChart;
