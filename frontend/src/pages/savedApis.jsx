import React from "react";
import SavedApiTable from "../components/savedApiTable.jsx";

const MonitorApis = () => {
  return (
    <div className="ml-[10rem] px-4 py-6 w-[calc(100%-10rem)] max-w-full overflow-x-hidden bg-background">
      <SavedApiTable />
    </div>
  );
};

export default MonitorApis;
