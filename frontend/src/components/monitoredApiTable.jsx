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
            const res = await axios.get(`https://valid8-oypy.onrender.com/api/monitor?page=${pageNum}&limit=${limit}`);
            console.log("Logs API response:", res.data);
            setApis(res.data.data);
            setTotal(res.data.data.length);
        } catch (error) {
            console.error("Failed to fetch  APIs:", error);
            setApis([]);
        }
    };

    const totalPages = Math.ceil(total / limit);

    return (
         <div className="w-full max-w-screen-xl bg-white rounded-xl shadow-md p-6 overflow-x-auto min-h-screen   ">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Monitored APIs</h2>
                <table className="w-full table-auto border border-collapse text-sm md:text-base">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border text-left">Method</th>
                            <th className="px-4 py-2 border text-left">URL</th>
                            <th className="px-4 py-2 border text-left">Status</th>
                            
                            <th className="px-4 py-2 border text-left">Last Tested</th>
                            <th className="px-4 py-2 border text-left">Monitored</th>
                            <th className="px-4 py-2 border text-left">Error</th>
                            <th className="px-4 py-2 border text-left">Failure count</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {apis.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-4">No minitored APIs found.</td>
                            </tr>
                        ) : (
                            apis.map((api) => (
                                <tr key={api._id} className="text-left border-t">
                                    <td className="px-4 py-2 border">{api.method || "GET"}</td>
                                    <td className="px-4 py-2 border max-w-[350px] truncate">{api.url}</td>
                                    <td className={`px-4 py-2 border ${api.statusCode >= 400 ? "text-red-500" : "text-green-600"}`}>
                                        {api.statusCode}
                                    </td>
                                    
                                    <td className="px-4 py-2 border">{new Date(api.lastestedAt).toLocaleString()}</td>
                                    <td className="px-4 py-2 border">{api.monitor}</td>
                                    <td className="px-4 py-2 border">{api.error}</td>
                                    <td className="px-4 py-2 border">{api.failureCount}</td>
                                   
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
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <span className="mt-2 md:mt-0">Page {page} of {totalPages}</span>
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
    );
};

export default MonitoredApiTable;
