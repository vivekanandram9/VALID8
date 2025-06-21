import React from 'react'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/home.jsx'
import Navbar from './components/navbar.jsx'
import Signup from './pages/signupPage.jsx'
import Login from './pages/login.jsx'
import Protectedroute from './components/Protectedroute.jsx'
import { RouterProvider, createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './layout.jsx'
import DashboardLayout from './dashboardLayout.jsx'
import Dashboard from './pages/dashboard.jsx'
import SavedApis from './pages/savedApis.jsx'
import MonitorApis from './pages/monitoredAPI.jsx'
import Analytics from './pages/analytics.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/*Public layout with navbar*/}
      <Route path='/' element={<Layout />}>
        <Route path='' element={<Home />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path="/Login" element={<Login />} />
      </Route>

      {/*Dashboard layout with sidebar*/}
      <Route element={<Protectedroute/>}>
        <Route element={<DashboardLayout/>}> 
              <Route path="/Dashboard" element={<Dashboard/>} />
              <Route path="/SavedApis" element={<SavedApis/>}/>
              <Route path="/MonitorApis" element={<MonitorApis/>}/>
              <Route path="/Analytics" element={<Analytics/>}/>


        </Route>
      </Route>

    </>

  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
