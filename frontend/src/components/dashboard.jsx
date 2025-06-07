import { useEffect, useRef, useState } from "react"
import axios from "axios"
import DashboardHeader from "./dashboardHeader.jsx";



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

  const addQueryParam = () => {
    setQueryParams([...queryParams, {key: "", value: ""}]);
  };
  const addHeader = () => {
    setHeaders([...headers, {key: "", value: ""}]);
  };

  const removeQueryParam = (index) => {
    setQueryParams(queryParams.filter((_, i) => i !== index));
  };
  const removeHeader = (index) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  

  

  

  /*const handleSendRequest = async () => {
    try {
      const options = {
        url: inputValue,
        method: dropdownValue,
        params: Object.fromEntries(queryParams.map(q => [q.key, q.value])),
        headers: Object.fromEntries(headers.map(h => [h.key, h.value]))

      };

      if(["POST", "PUT"].includes(dropdownValue)){
        options.data = JSON.parse(jsonBody);
      }

      const response = await axios(options);
      setStatus(response.status);
      setResponseHeaders(response.headers);
      setResult(JSON.stringify(response.data, null, 2));

      //save monitoring preference 
      await axios.post("http://localhost:5000/api/monitor",{
        url: inputValue,
        name: "User API",
        monitor
      });
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };*/
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

      if(["POST" ,"PUT"].includes(dropdownValue)){
        payload.data = JSON.parse(jsonBody);
      }

      const response = await axios.post("https://valid8-oypy.onrender.com/api/test", payload);

      setStatus(response.data.status);
      setResponseHeaders(response.headers);
      setResult(JSON.stringify(response.data.data, null, 2));

      //save monitoring preference
      await axios.post("hhttps://valid8-oypy.onrender.com/api/monitor", {
        url: inputValue,
        name: "User API",
        monitor
      });
    } catch(error){
      setResult(`Error: ${error.message}`);
      setStatus(error.response?.status || "Request Failed");
    }
  };

  return (

    <div className="dashboardContainer p-6 bg-black min-h-screen pl-[11rem] text-white ">
      <hr className="border-t  border-gray-300  left-0 top-[6rem] w-full fixed" />
      <DashboardHeader/>
      
      <div className="flex gap-4 mb-4">
        {/* Dropdown Menu */}
        <select
          value={dropdownValue}
          onChange={(e) => setDropdownValue(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>

        {/* Input Box */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter API URL"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Send Button */}
        <button
          onClick={handleSendRequest}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
        <div className="flex items-center gap-2">
            <input type="checkbox"
            id="monitor"
            checked={monitor}
            onChange={(e) => setMonitor(e.target.checked)}
            className="w-4 h-4" />
            <label htmlFor="monitor" className="text-sm">Monitor this API reglarly</label>
        </div>
        <div className="flex items-center gap-2">
            <input type="checkbox"
            id="saveResult"
            checked={saveResult}
            onChange={(e) => setSaveResult(e.target.checked)}
            className="w-4 h-4" />
            <label htmlFor="saveResult" className="text-sm">Save</label>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        {["Query Params", "Headers", "JSON"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium ${activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500 hover:text-gray-700"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
        {activeTab === "Query Params" &&  (
        <div className="query-param">
          {queryParams.map((param, index) => (
            <div key={index}>
              <input
              className="border border-black m-2 p-2 w-[15rem]"
              type="text"
              placeholder="key"
              value={param.key}
              onChange={(e) => {
                const newQueryParams = [...queryParams];
                newQueryParams[index].key = e.target.value;
                setQueryParams(newQueryParams);
              }}
              />
              <input
              className="border border-black m-2 p-2 w-[15rem]"
              type="text"
              placeholder="value"
              value={param.value}
              onChange={(e) => {
                const newQueryParams = [...queryParams];
                newQueryParams[index].value = e.target.value;
                setQueryParams(newQueryParams);
              }} />
              <button onClick={() => removeQueryParam(index)} className="mt-2 border border-red-500 bg-white text-red-500 w-[5rem] h-[2.5rem] p-1 rounded-xl border-2 hover:text-white hover:bg-red-500">Remove</button>

            </div>
          ))}
          
          <button onClick={addQueryParam} data-add-query-param-btn className="mt-2 border border-green-500 bg-white text-green-500 w-[3rem] p-1 rounded-xl border-2 hover:text-white hover:bg-green-500">Add</button>
          
        </div>)}
        {activeTab === "Headers" && (
        <div className="header" id="request-headers">
          {headers.map((header, index) => (
            <div key={index} className="flex space-x-2 ">
              <input
              className="border border-black m-2 p-2 w-[15rem]" 
              type="text"
              placeholder="Header key"
              value={header.key}
              onChange={(e) => {
                const newHeaders = [...headers];
                newHeaders[index].key = e.target.value;
                setHeaders(newHeaders);
              }} />
              <input
               className="border border-black m-2 p-2 w-[15rem]" 
              type="text"
              placeholder="Header value"
              value={header.value}
              onChange={(e) => {
                const newHeaders = [...headers];
                newHeaders[index].value = e.target.value;
                setHeaders(newHeaders);
              }} />
              <button onClick={() => removeHeader(index)} className="mt-2 border border-red-500 bg-white text-red-500 w-[5rem] h-[2.5rem] p-1 rounded-xl border-2 hover:text-white hover:bg-red-500">Remove</button>
            </div>
          ))}
          
          <button onClick={addHeader} className="mt-2 border border-green-500 bg-white text-green-500 w-[3rem] p-1 rounded-xl border-2 hover:text-white hover:bg-green-500">Add</button>
          
        </div>)}
        {activeTab === "JSON" && (
          <textarea className="w-full h-40 p-2 border text-black" value={jsonBody}
          onChange={(e) => setJsonbody(e.target.value)}></textarea>
          
          
          
        )}
      </div>

      {/* Results Box */}
      <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-lg h-96 overflow-y-auto">
        <h3>Status: {status}</h3>
        <h4>Response Headers:</h4>
        <pre>{responseHeaders ? JSON. stringify(responseHeaders, null, 2) : "No headers"}</pre>
        <h4>Response Body:</h4>
        <pre className="whitespace-pre-wrap text-sm text-gray-800">
          {result || "Results will be displayed here..."}
        </pre>
      </div>
      
    </div>
  );
}

export default Dashboard
