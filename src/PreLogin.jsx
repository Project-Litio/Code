import React from 'react'
import logo from './assets/LogoFFFFFF.png'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function PreLogin() {
  return (
    <><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
    <div className='wrapper'>
      <div className='triangle'></div>
      <div className='login rounded'>
        <button type='button' className='return'><i class="fa fa-chevron-left"></i></button>
        <div className='logoContainer'>
          <img src={logo} className='logoImage'/>
        </div>
        <h2 className='title'>¿Cuál es tu rol?</h2>
        <button className='btnClient'>Cliente</button>
        <button className='btnJefe'>Jefe de Taller</button>
        <button className='btnGerente'>Gerente</button>
        <button className='btnVendedor'>Vendedor</button>
      </div>
    </div></>
  )
}

export default PreLogin