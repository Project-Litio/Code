
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/home'
import Collection from './pages/collection'
import PreLogin from './pages/prelogin'
import login from './pages/login'

import {
  BrowserRouter as Router,
  Routes,
  Route} from "react-router-dom";

function App() {
  return (
    <div className='bg-dark'>
      
      <Router className='white'>

        <Routes >
          <Route path='/' exact Component={Home}></Route>
          <Route path='/collection' Component={Collection}></Route>
          <Route path='/repair' Component={Navbar}></Route>
          <Route path='/about' Component={Navbar}></Route>
          <Route path='/prelogin' Component={PreLogin}></Route>
          <Route path='/login' Component={login}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
