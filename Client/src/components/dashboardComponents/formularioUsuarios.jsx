import React from 'react'
import logo from '../../assets/LogoFFFFFF.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import { Link } from 'react-router-dom'

function FormularioUsuarios() {
  return (
    <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <div className='registro rounded'>
        <form>
          <h2 className='title'>Registro de Usuarios</h2>
          <div className='form-group mb-2'>
            <label htmlFor='email' className='form-label'>Ingresa el id del usuario</label>
            <input type="email" className='form-control'></input>
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='text' className='form-label'>Ingresa el nombre del usuario</label>
            <input type="text" className='form-control'></input>
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='text' className='form-label'>Ingresa la dirección del usuario</label>
            <input type="text" className='form-control'></input>
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='text' className='form-label'>Ingresa el email del usuario</label>
            <input type="text" className='form-control'></input>
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='text' className='form-label'>Ingresa el celular del usuario</label>
            <input type="text" className='form-control'></input>
          </div>
          <button type='submit'>Registrar</button>
        </form>
      </div></>
  )
}

export default FormularioUsuarios