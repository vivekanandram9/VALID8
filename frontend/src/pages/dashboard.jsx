import { useEffect, useState } from "react";
import axios from "axios";
import DashboardHeader from "../components/dashboardHeader.jsx";

function Dashboard() {
  const [dropdownValue, setDropdownValue] = useState("GET");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [activeTab, setActiveTab] = useState("Query Params");
  const [queryParams, setQueryParams] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [jsonBody, setJsonbody] = useState("{}");
  const [status, setStatus] = useState(null);
  const [responseHeaders, setResponseHeaders] = useState(null);
  const [monitor, setMonitor] = useState(false);
  const [saveResult, setSaveResult] = useState(false);

  useEffect(() => {
    console.log("Component mounted. DOM is available");
  }, []);

  const handleMonitorchange = (e) => {
    const checked = e.target.checked;
    setMonitor(checked);

    if (checked && !saveResult) {
      setSaveResult(true);
    }
  };

  const addQueryParam = () => setQueryParams([...queryParams, { key: "", value: "" }]);
  const addHeader = () => setHeaders([...headers, { key: "", value: "" }]);
  const removeQueryParam = (index) => setQueryParams(queryParams.filter((_, i) => i !== index));
  const removeHeader = (index) => setHeaders(headers.filter((_, i) => i !== index));

  const handleSendRequest = async () => {
    try {
      const payload = {
        url: inputValue,
        method: dropdownValue,
        headers: Object.fromEntries(headers.map(h => [h.key, h.value])),
        params: Object.fromEntries(queryParams.map(q => [q.key, q.value])),
        monitor,
        saveResult,
      };

      if (["POST", "PUT"].includes(dropdownValue)) {
        payload.data = JSON.parse(jsonBody);
      }

      const response = await axios.post("https://valid8-oypy.onrender.com/api/test", payload);
      setStatus(response.data.status);
      setResponseHeaders(response.headers);
      setResult(JSON.stringify(response.data.data, null, 2));

      await axios.post("https://valid8-oypy.onrender.com/api/monitor", {
        url: inputValue,
        monitor
      });
    } catch (error) {
      setResult(`Error: ${error.message}`);
      setStatus(error.response?.status || "Request Failed");
    }
  };

  return (
    <div className="dashboardContainer p-6 bg-background min-h-screen pl-[11rem] text-foreground">
      {/*<hr className="border-t border-textSecondary left-0 top-[6rem] w-full fixed" />*/}
      <DashboardHeader />

      <div className="flex gap-4 mb-4 mt-[2rem]">
        <select
          value={dropdownValue}
          onChange={(e) => setDropdownValue(e.target.value)}
          className="px-4 py-2 bg-glass border border-textSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-lred text-foreground"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter API URL"
          className="flex-grow px-4 py-2 bg-glass border border-textSecondary rounded-lg focus:outline-none focus:ring-2 focus:ring-lred text-foreground placeholder-textSecondary"
        />

        <button
          onClick={handleSendRequest}
          className="px-6 py-2 bg-lred text-white rounded-lg hover:bg-lred/80 focus:outline-none focus:ring-2 focus:ring-lred shadow-glow"
        >
          Send
        </button>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="monitor"
            checked={monitor}
            onChange={(e) => {
              const isChecked = e.target.checked;
              setMonitor(isChecked);
              if (isChecked && !saveResult) {
                setSaveResult(true); // Auto-check Save
              }
            }}
            className="w-4 h-4"
          />
          <label htmlFor="monitor" className="text-sm text-textSecondary">Monitor this API regularly</label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="saveResult"
            checked={saveResult}
            onChange={(e) => setSaveResult(e.target.checked)}
            className="w-4 h-4"
          />
          <label htmlFor="saveResult" className="text-sm text-textSecondary">Save</label>
        </div>

      </div>

      <div className="flex border-b border-textSecondary mb-4">
        {["Query Params", "Headers", "JSON"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium transition ${activeTab === tab ? "border-b-2 border-lred text-lred" : "text-textSecondary hover:text-foreground"}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-glass p-4 border border-textSecondary rounded-lg shadow-glow">
        {activeTab === "Query Params" && (
          <div>
            {queryParams.map((param, index) => (
              <div key={index}>
                <input className="bg-transparent border border-textSecondary m-2 p-2 w-[15rem] rounded-md text-foreground placeholder-textSecondary" type="text" placeholder="key" value={param.key} onChange={(e) => { const newParams = [...queryParams]; newParams[index].key = e.target.value; setQueryParams(newParams); }} />
                <input className="bg-transparent border border-textSecondary m-2 p-2 w-[15rem] rounded-md text-foreground placeholder-textSecondary" type="text" placeholder="value" value={param.value} onChange={(e) => { const newParams = [...queryParams]; newParams[index].value = e.target.value; setQueryParams(newParams); }} />
                <button onClick={() => removeQueryParam(index)} className="mt-2 border border-lred bg-transparent text-lred w-[5rem] h-[2.5rem] p-1 rounded-xl hover:bg-lred hover:text-white">Remove</button>
              </div>
            ))}
            <button onClick={addQueryParam} className="mt-2 border border-lred bg-transparent text-lred w-[3rem] p-1 rounded-xl hover:bg-lred hover:text-white">Add</button>
          </div>
        )}

        {activeTab === "Headers" && (
          <div>
            {headers.map((header, index) => (
              <div key={index} className="flex space-x-2">
                <input className="bg-transparent border border-textSecondary m-2 p-2 w-[15rem] rounded-md text-foreground placeholder-textSecondary" type="text" placeholder="Header key" value={header.key} onChange={(e) => { const newHeaders = [...headers]; newHeaders[index].key = e.target.value; setHeaders(newHeaders); }} />
                <input className="bg-transparent border border-textSecondary m-2 p-2 w-[15rem] rounded-md text-foreground placeholder-textSecondary" type="text" placeholder="Header value" value={header.value} onChange={(e) => { const newHeaders = [...headers]; newHeaders[index].value = e.target.value; setHeaders(newHeaders); }} />
                <button onClick={() => removeHeader(index)} className="mt-2 border border-lred bg-transparent text-lred w-[5rem] h-[2.5rem] p-1 rounded-xl hover:bg-lred hover:text-white">Remove</button>
              </div>
            ))}
            <button onClick={addHeader} className="mt-2 border border-lred bg-transparent text-lred w-[3rem] p-1 rounded-xl hover:bg-lred hover:text-white">Add</button>
          </div>
        )}

        {activeTab === "JSON" && (
          <textarea className="w-full h-40 p-2 border border-textSecondary bg-transparent text-foreground placeholder-textSecondary rounded-md" value={jsonBody} onChange={(e) => setJsonbody(e.target.value)}></textarea>
        )}
      </div>

      <div className="mt-4 p-4 bg-glass border border-textSecondary rounded-lg shadow-glow h-96 overflow-y-auto text-foreground">
        <h3 className="text-lred font-semibold">Status: {status}</h3>
        <h4 className="text-textSecondary mt-2">Response Headers:</h4>
        <pre className="text-sm text-foreground">{responseHeaders ? JSON.stringify(responseHeaders, null, 2) : "No headers"}</pre>
        <h4 className="text-textSecondary mt-2">Response Body:</h4>
        <pre className="whitespace-pre-wrap text-sm text-foreground">{result || "Results will be displayed here..."}</pre>
      </div>
    </div>
  );
}

export default Dashboard;
