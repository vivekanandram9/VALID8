import React from "react";
import MonitoredApiTable from "../components/monitoredApiTable.jsx";

const MonitorApis = () => {
    return (
         <div className="ml-[10rem] px-4 py-6 w-[calc(100%-10rem)] max-w-full overflow-x-hidden">
      <MonitoredApiTable />
    </div>
    );
};

export default MonitorApis;