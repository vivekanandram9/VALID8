import React, { useEffect, useState } from "react";
import axios from "axios";

const SavedApiTable = () => {
  const [apis, setApis] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    fetchSavedApis(page);
  }, [page]);

  const fetchSavedApis = async (pageNum) => {
    try {
      const res = await axios.get(
        `https://valid8-oypy.onrender.com/api/logs?page=${pageNum}&limit=${limit}`
      );
      setApis(res.data.data);
      setTotal(res.data.total || res.data.data.length);
    } catch (error) {
      console.error("Failed to fetch saved APIs:", error);
      setApis([]);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="w-full max-w-screen-xl bg-[#161616] text-[#b1b8c2] rounded-xl shadow-glow p-6 overflow-x-auto min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-[#b1b8c2]">Saved API Tests</h2>

      <table className="w-full table-auto border border-collapse text-sm md:text-base">
        <thead className="bg-[#1f1f1f]">
          <tr>
            <th className="px-4 py-2 border border-[#2a2a2a] text-left">Method</th>
            <th className="px-4 py-2 border border-[#2a2a2a] text-left">URL</th>
            <th className="px-4 py-2 border border-[#2a2a2a] text-left">Status</th>
            <th className="px-4 py-2 border border-[#2a2a2a] text-left">Response Time</th>
            <th className="px-4 py-2 border border-[#2a2a2a] text-left">Created At</th>
          </tr>
        </thead>

        <tbody>
          {apis.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-textSecondary py-4">
                No saved APIs found.
              </td>
            </tr>
          ) : (
            apis.map((api) => (
              <tr key={api._id} className="text-left border-t border-[#2a2a2a]">
                <td className="px-4 py-2 border border-[#2a2a2a]">{api.method || "GET"}</td>
                <td className="px-4 py-2 border border-[#2a2a2a] max-w-[350px] truncate">
                  {api.url}
                </td>
                <td
                  className={`px-4 py-2 border border-[#2a2a2a] ${
                    api.statusCode >= 400
                      ? "text-[#FF5A5A]"
                      : "text-[#ffff00]"
                  }`}
                >
                  {api.statusCode}
                </td>
                <td className="px-4 py-2 border border-[#2a2a2a]">
                  {api.responseTime} ms
                </td>
                <td className="px-4 py-2 border border-[#2a2a2a]">
                  {new Date(api.createdAt).toLocaleString()}
                </td>
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
          className="px-4 py-2 bg-[#1f1f1f] text-[#b1b8c2] border border-[#2a2a2a] rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="mt-2 md:mt-0">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-[#1f1f1f] text-[#b1b8c2] border border-[#2a2a2a] rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SavedApiTable;
