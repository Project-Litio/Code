import React from 'react'
import './style.css'

const MyData = ({data}) => {
  return (
    <div className='section'>
      <div className='text'>
        <h1>Bienvenido, {data.first_name}</h1>
        <p>En esta seccion podrás ver las cotizaciones a tu nombre, las facturas de tus vehículos, así como solicitar y ver las reparaciones
          en curso. Si tienes alguna duda contactate con <font style={{color: '#039257'}}> litioservice@gmail.com </font> 
        </p>
      </div> 
    </div>
  )
}

export default MyData