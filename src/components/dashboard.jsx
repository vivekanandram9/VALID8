import { useState } from "react"
import axios from "axios"


function Dashboard() {
  const [dropdownValue, setDropdownValue] = useState("GET");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");
  const [activeTab, setActiveTab] = useState("Query Params");

  const handleSendRequest = async () => {
    try {
      const response = await axios({
        url: inputValue,
        method: dropdownValue,
      });
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="dashboardContainer p-6 bg-gray-100 min-h-screen">
      
      <div className="flex gap-4 mb-4">
        {/* Dropdown Menu */}
        <select
          value={dropdownValue}
          onChange={(e) => setDropdownValue(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        {activeTab === "Query Params" &&  <div className="query-param">
          <div className="data-query" id="request-query">
          <form data-key-value-pair className="flex">
          <input className="border border-black w-[15rem] p-3 m-2" type="text" placeholder="key" />
          <input className="border border-black w-[15rem] p-3 m-2" type="text" placeholder="value" />
          <button type="button" className="mt-2 border border-red-500 bg-white text-red-500 w-[5rem] p-1 rounded-xl border-2 hover:text-white hover:bg-red-500 relative bottom-1">Remove</button>
        </form>

          </div>
          <button className="mt-2 border border-green-500 bg-white text-green-500 w-[3rem] p-1 rounded-xl border-2 hover:text-white hover:bg-green-500">Add</button>
          
        </div>}
        {activeTab === "Headers" && <div className="header" id="request-headers">
          <div  className="data"></div>
          <button className="mt-2 border border-green-500 bg-white text-green-500 w-[3rem] p-1 rounded-xl border-2 hover:text-white hover:bg-green-500">Add</button>
          
        </div>}
        {activeTab === "JSON" && <div className="header" id="json">
          <div  className="data overflow-auto max-h-[200px]"></div>
          
          
        </div>}
      </div>

      {/* Results Box */}
      <div className="mt-4 p-4 bg-white border border-gray-300 rounded-lg shadow-lg h-96 overflow-y-auto">
        <pre className="whitespace-pre-wrap text-sm text-gray-800">
          {result || "Results will be displayed here..."}
        </pre>
      </div>
      <template data-key-value-template>
        <form data-key-value-pair className="flex">
          <input type="text" placeholder="key" />
          <input type="text" placeholder="value" />
          <button type="button" className="mt-2 border border-red-500 bg-white text-red-500 w-[3rem] p-1 rounded-xl border-2 hover:text-white hover:bg-red-500">Remove</button>
        </form>

      </template>
    </div>
  );
}

export default Dashboard
