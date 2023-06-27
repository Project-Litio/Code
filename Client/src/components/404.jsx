import React from 'react'
import logo from '../assets/LogoFFFFFF.png'
import car from '../assets/crashed.png'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

import Cookies from 'universal-cookie';

function NotFound() {
  const cookies = new Cookies();
  return (
    <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <div className='wrapper2'>
      <div className='triangle'></div>
        <div className='login rounded'>
          <div className='logoContainer'>
            <img src={logo} className='logoImage'/>
          </div>
          <br></br><br></br>
          <h2 className='title'>Lo sentimos :&#40;</h2>
          <h3 className='title'>Has chocado con una página que no existe.</h3>
          <Link className="nav-link" to='/'>
            <button type='buttom' className='btn btn-success mt-5' id='entrar'>Volver a Litio</button>
          </Link>
        </div>
    </div></>
  )
}

export default NotFound