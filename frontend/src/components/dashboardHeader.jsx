import React, { useEffect, useState} from "react";
import axios from "axios";

const StatCard = ({ title, value, color = "bg-gray-800"}) => (
    <div className={`${color} rounded-lg p-4 shadow-md text-white `}>
        <h4 className="text-sm text-gray-400">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
    </div>
);

const DashboardHeader = () => {
    const [stats, setStats] = useState({
        totalTested: 0,
        monitered: 0,
        lastFailure: "N/A",
        uptime:"N/A"
    });

    const [greeting, setGreeting] = useState("");
    const [username, setusername] = useState("user");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const statsRes = await axios.get("https://valid8-oypy.onrender.com/api/stats");
                setStats(statsRes.data);
            } catch (error) {
                console.error("failed to fetch dashboard stats:", error);
                
            }
        };

        const fetchUser = async () => {
            try {
                const userRes = await axios.get("https://valid8-oypy.onrender.com/api/auth/user", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setusername(userRes.data.name);
            } catch (error) {
                console.error("failed to fetch user info:", error);
            }
        };

        const getGreeeting = () => {
            const hour = new Date().getHours();
            if(hour < 12) return "Good Morning";
            if(hour < 18) return "Good Afternoon";
            return "Good Evening";
        };
        setGreeting(getGreeeting());
        fetchStats();
        fetchUser();
    }, []);

    return (
        <>
        <div className="mb-8 space-y-6">
            <div className="sticky">
                <h1 className="text-3xl font-bold text-white">
                    {greeting}, {username}👋
                </h1>
                <p className="text-gray-400 mt-1">Here's your API snapshot:</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard title="APIs Tested" value= {stats.totalTested}/>
                <StatCard title="Monitored APIs" value={stats.monitered} color="bg-blue-800"/>
                <StatCard title="Last Failure" value={stats.lastFailure} color="bg-red-800"/>
                <StatCard title="Uptime Rate" value={stats.uptime} color="bg-green-800"/>
                
            </div>
        </div>
        </>
    );


};

export default DashboardHeader;