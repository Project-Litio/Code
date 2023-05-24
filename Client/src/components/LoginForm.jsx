import React from 'react'
import logo from '../assets/LogoFFFFFF.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Link } from 'react-router-dom'

function LoginForm() {
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
        <form>
          <h2 className='title'>Inicio de sesión</h2>
          <div className='form-group mb-2'>
            <label htmlFor='email' className='form-label'>Ingresa tu correo electrónico</label>
            <input type="email" className='form-control'></input>
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='password' className='form-label'>Ingresa tu Contraseña </label>
            <input type="password" className='form-control'></input>
          </div>
          <Link className="nav-link" to='/Dashboard'>  
          Sucursales
        </Link> 
          <button type='submit' className='btn btn-success mt-5'>Entrar</button>
        </form>
      </div>
    </div></>
  )
}

export default LoginForm