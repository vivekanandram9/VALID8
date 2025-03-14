import {Navigate, Outlet} from "react-router-dom";

const Protectedroute = () => {

    /*const isAuthenticated = document.cookie.includes("authToken");
    console.log("check:",isAuthenticated);
    return isAuthenticated ? <Outlet/> : <Navigate to ="/login" />;*/
    const token = localStorage.getItem("token"); // get token from local storage
    console.log("checking authentication:", token); 

    return token ? <Outlet/> : <Navigate to="/Login"/>;
   
};

export default Protectedroute;