import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function SuccessPieChart({ apiUrl = ""}){
    const [chartData, setChartData] = useState({
        labels: ["Success", "Failure"],
        datasets: [
            {
                label: "API Health",
                data:[0,0],
                backgroundColor: ["#4CAF50", "#F44336"],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = apiUrl 
                ? `https://valid8-oypy.onrender.com/api/data/success-ratio?url=${encodeURIComponent(apiUrl)}`: "https://valid8-oypy.onrender.com/api/data/success-ratio";

                const res = await axios.get(url);
                setChartData({
                    labels: ["Success", "Failure"],
                    datasets: [
                        {
                            label: "API Health",
                            data: [res.data.success || 0, res.data.failure || 0],
                            backgroundColor:  ["#4CAF50", "#F44336"],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch(err){
                console.error("Failed to fetch success ratio:", err.message);
            }
        };
        fetchData();
    },[apiUrl]);

    return (
         <div className="w-full max-w-md mx-auto h-[300px]">
      <Pie data={chartData} />
    </div>
    );
}

export default SuccessPieChart;