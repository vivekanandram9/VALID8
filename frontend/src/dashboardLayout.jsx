import Sidebar from "./components/sidebar.jsx";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <>
        <Sidebar></Sidebar>
        <main>
            <Outlet></Outlet>
        </main>
    </>
  )
}

export default DashboardLayout;
