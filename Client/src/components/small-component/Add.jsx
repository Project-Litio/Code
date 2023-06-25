import React from 'react'
import '../style.css'

const Add = () => {
  return (
    <div className='container'>
      <div className=" row justify-content-between text-left px-3 py-5 w-100">
      <div className="col-12 col-sm-6 col-md-3 cardI text-center py-2">
        <div className="div">
          <h5>Reserva Online</h5>
          <p>Compra tu vehículo desde la comodidad de tu hogar</p>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-3 cardI text-center py-2">
        <div className="div">
          <h5>Compara Precios</h5>
          <p>Y verás que los nuestros son los mejores</p>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-3 cardI text-center py-2">
        <div className="div">
          <h5>Agenda Tu Test Drive</h5>
          <p>Prueba el vehículo de tus sueños</p>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-3 cardI text-center py-2">
        <div className="div">
          <h5>Encuentra Uno Para Ti</h5>
          <p>Una amplia variedad sobre la cual escoger</p>
        </div>
      </div>

      </div>
    </div>
  )
}

export default Add