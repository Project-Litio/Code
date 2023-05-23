import React from 'react'
import logo from '../assets/LogoFFFFFF.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Link } from 'react-router-dom'
function PreLogin() {
  return (
    <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <div className='wrapper'>
      <div className='triangle'></div>
      <div className='login rounded'>
        
        


        <Link className="nav-link" to='/'>  
          <button type='button' className='return'> <i className="fa fa-chevron-left"></i> </button>
        </Link>  
        <div className='logoContainer'>
          <img src={logo} className='logoImage'/>
        </div>
        <h2 className='title'>¿Cuál es tu rol?</h2>
        <Link className="nav-link" to='/login'> <button className='btnClient'>Cliente</button> </Link>
        <Link className="nav-link" to='/login'> <button className='btnJefe'>Jefe de Taller</button> </Link>
        <Link className="nav-link" to='/login'>  <button className='btnGerente'>Gerente</button> </Link>
        <Link className="nav-link" to='/login'> <button className='btnVendedor'>Vendedor</button>  </Link>
      </div>
    </div></>
  )
}

export default PreLogin