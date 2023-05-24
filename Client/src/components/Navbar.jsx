import React from 'react'
import img from '../assets/logo.png'
import Hero from './hero';
import './style.css'

//import PreLogin from '../pages/prelogin';
import {
  Link
} from "react-router-dom";

const Navbar = () => {
  return (
      <nav className="navbar navbar-expand-lg bg-dark pb-3" data-bs-theme="dark">
        <div className="container pt-3">
          <Link className="navbar-brand " to='/'><img src={img} alt="Litio" width={180} />  </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse navbar-brand " id="navbarNav">
            <ul className="navbar-nav  ms-auto px-3 fs-4 ">
              <li className="nav-item mx-3">
                <Link className=" nav-link  active " to='/' ><font color='white'>Inicio</font></Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link " to='/collection'> <font color='White '>Colección</font> </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to='/repair'> <font color='White'>Reparación</font>  </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to='/about'> <font color='White'> Sobre Nosotros</font></Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link active"  to='/prelogin'> <font color='White'>Log In</font></Link>
              </li> 
            </ul>
          </div>
        </div>
        
      </nav>
  )
}

export default Navbar