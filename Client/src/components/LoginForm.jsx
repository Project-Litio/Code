import React from 'react'
import logo from '../assets/LogoFFFFFF.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import { Link } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {getCustomers} from '../api/login.api'

function LoginForm() {
  const {register, handleSubmit} = useForm();
  
  const onSubmit = handleSubmit(async data => {await console.log(getCustomers())})

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
        <form onSubmit={onSubmit}>
          <h2 className='title'>Inicio de sesión</h2>
          <div className='form-group mb-2'>
            <label htmlFor='ID' className='form-label'>Ingresa tu correo electrónico</label>
            <input type="text" className='form-control' {...register("email", {required: true})}></input>
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='password' className='form-label'>Ingresa tu Contraseña </label>
            <input type="password" className='form-control' {...register("password", {required: true})}></input>
          </div>
          <Link className="nav-link" to='/Dashboard'>  
          Sucursales
        </Link> 
          <button type='buttom' className='btn btn-success mt-5'>Entrar</button>
        </form>
      </div>
    </div></>
  )
}

export default LoginForm