import React from "react";
import MonitoredApiTable from "../components/monitoredApiTable.jsx";

const MonitorApis = () => {
    return (
         <div className="p-5 absolute ml-[10rem] lg:w-[70%] xl:w-[89%]">
            <MonitoredApiTable/>
        </div>
    );
};

export default MonitorApis;