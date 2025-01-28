import { useState } from 'react'
import Navbar from './components/navbar'
import Home from './components/home'
import Signup from './components/signupPage';
import {BrowserRouter} from 'react-router-dom';

import './index.css'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
      <Home></Home>
      <Signup></Signup>
      </BrowserRouter>
      
    </>
  )
}

export default App
