import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(PointElement, LinearScale, TimeScale, Tooltip, Legend);

function SlowResponsesScatterChart() {
  const [chartData, setChartData] = useState({
    datasets: [
      {
        label: "Slow Responses",
        data: [],
        backgroundColor: "#E91E63",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/data/slow-responses?min=1000");
        const data = res.data.map((entry) => ({
          x: new Date(entry.createdAt),
          y: entry.responseTime,
        }));

        setChartData({
          datasets: [
            {
              label: "Slow Responses (ms)",
              data,
              backgroundColor: "#E91E63",
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching slow responses:", err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto h-full ">
      <Scatter
        data={chartData}
        options={{
          scales: {
            x: {
              type: "time",
              time: {
                unit: "minute",
              },
              title: {
                display: true,
                text: "Timestamp",
              },
            },
            y: {
              title: {
                display: true,
                text: "Response Time (ms)",
              },
            },
          },
        }}
      />
    </div>
  );
}

export default SlowResponsesScatterChart;
