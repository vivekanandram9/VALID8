import React, { useEffect, useState } from "react";
import axios from "axios";

const MonitoredApiTable = () => {
    const [apis, setApis] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;

    useEffect(() => {
        fetchMonitoredApis(page);
    }, [page]);

    const fetchMonitoredApis = async (pageNum) => {
        try {
            const res = await axios.get(
                `https://valid8-oypy.onrender.com/api/monitor?page=${pageNum}&limit=${limit}`
            );
            setApis(res.data.data);
            setTotal(res.data.total || res.data.data.length);
        } catch (error) {
            console.error("Failed to fetch APIs:", error);
            setApis([]);
        }
    };
    const handleMonitorToggle = async (id, newValue) => {
        try {
            await axios.patch(`http://localhost:5000/api/monitor/${id}`, {
                monitor: newValue,
            })
            setApis((prev) =>
                prev.map((api) =>
                    api._id === id ? { ...api, monitor: newValue } : api
                )

            );
        } catch (error) {
            console.error("Failed to toggle monitor status:", error);
        }
    };

    const totalPages = Math.ceil(total / limit);

    return (
        <div className="w-full max-w-screen-xl bg-background text-foreground rounded-xl shadow-glow p-6 overflow-x-auto min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Monitored APIs</h2>

            <table className="w-full table-auto border border-glow text-sm md:text-base">
                <thead className="bg-[#1f1f1f]">
                    <tr>
                        <th className="px-4 py-2 border border-[#2a2a2a] text-left">Method</th>
                        <th className="px-4 py-2 border border-[#2a2a2a] text-left">URL</th>
                        <th className="px-4 py-2 border border-[#2a2a2a] text-left">Status</th>
                        <th className="px-4 py-2 border border-[#2a2a2a] text-left">Last Tested</th>
                        <th className="px-4 py-2 border border-[#2a2a2a] text-left">Monitored</th>
                        <th className="px-4 py-2 border border-[#2a2a2a] text-left">Error</th>
                        <th className="px-4 py-2 border border-[#2a2a2a] text-left">Failures</th>
                    </tr>
                </thead>

                <tbody>
                    {apis.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="text-center text-textSecondary py-4">
                                No monitored APIs found.
                            </td>
                        </tr>
                    ) : (
                        apis.map((api) => (
                            <tr key={api._id} className="border-t border-[#2a2a2a]">
                                <td className="px-4 py-2 border border-[#2a2a2a]">{api.method || "GET"}</td>
                                <td className="px-4 py-2 border border-[#2a2a2a] max-w-[350px] truncate">{api.url}</td>
                                <td
                                    className={`px-4 py-2 border border-[#2a2a2a] ${api.statusCode >= 400 ? "text-lred" : "text-lyellow"
                                        }`}
                                >
                                    {api.statusCode}
                                </td>
                                <td className="px-4 py-2 border border-[#2a2a2a]">{new Date(api.lastTestedAt).toLocaleString()}</td>
                                <td className="px-4 py-2 border border-[#2a2a2a]">
  <label className="flex items-center gap-3 cursor-pointer">
    <div className="relative inline-block w-11 h-6">
      <input
        type="checkbox"
        checked={api.monitor}
        onChange={() => handleMonitorToggle(api._id, !api.monitor)}
        className="sr-only peer"
      />
      <div className="w-full h-full bg-gray-600 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
      <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
    </div>
    <span className={`text-sm font-medium ${api.monitor ? "text-green-500" : "text-gray-400"}`}>
      {api.monitor ? "True" : "False"}
    </span>
  </label>
</td>

                                <td className="px-4 py-2 border border-[#2a2a2a] text-textSecondary">{api.error || "—"}</td>
                                <td className="px-4 py-2 border border-[#2a2a2a]">{api.failureCount}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex flex-wrap justify-between items-center mt-6">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-cardDark text-foreground border border-glow rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="mt-2 md:mt-0 text-foreground">
                    Page {page} of {totalPages}
                </span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-cardDark text-foreground border border-glow rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default MonitoredApiTable;
