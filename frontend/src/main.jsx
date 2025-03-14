import React from 'react'
import { StrictMode } from 'react'
import   ReactDOM  from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/home.jsx'
import Navbar from './components/navbar.jsx'
import Signup from './components/signupPage.jsx'
import Login from './components/login.jsx'
import Protectedroute from './components/Protectedroute.jsx'
import { RouterProvider, createBrowserRouter,Route, createRoutesFromElements } from 'react-router-dom'
import Layout from './layout.jsx'
import Dashboard from './components/dashboard.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
    <Route path='' element={<Home/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    <Route element={<Protectedroute/>}>
      <Route path='/Dashboard' element={<Dashboard/>}/>
    </Route>
    <Route path='/Login' element={<Login/>}></Route>
   
  
 

    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
