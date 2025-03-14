
import Navbar from './components/navbar'
import Home from './components/home'
import Signup from './components/signupPage';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Protectedroute from './components/Protectedroute';
import {BrowserRouter} from 'react-router-dom';

import './index.css'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Navbar></Navbar>
      <Home></Home>
      <Signup></Signup>
      <Login></Login>
      
      </BrowserRouter>
      
    </>
  )
}

export default App
