import React from 'react'
import './style.css'
import litio from '../assets/litio.jpg'

const AboutUs = () => {
  return (
    <div className='section'>
      <div className='text'>
        <h1>Sobre nosotros</h1>
        <p>Litio es una empresa ficticia originada en base a una asignación de la asignatura desarrollo de software I. Se encuentra a cargo
          de <font style={{color: '#039257'}}>Sebastian Idrobo, Mauricio Muñoz, Jose Hincapie, Brayan Sanchez y Mateo Duque.</font> Se trata de un servicio web para un concesionario,
          donde clientes, gerentes, vendedores y jefes de taller pueden acceder para realizar acciones especificas. Su utilidad se basa en la
          facilidad para el manejo de cuestiones como el inventario, donde el proceso se automatiza en cierta medida gracias a los scripts.
        </p>
      </div> 
        <img src={litio} className='lith'/>
    </div>
  )
}

export default AboutUs