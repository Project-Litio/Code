import React from 'react'
import img1 from '../../assets/cars/t-m-3.png'
import './style.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';




const CardCar = ({title,text}) => {
  const [color, setColor] = useState('wh'); // Estado inicial del color

  const handleButtonClick = () => {

    setColor('selected'); // Cambia el color al valor deseado
  };


  return (
    <div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6">
            <img src={img1} className="img-fluid rounded-start" alt="Auto"/>
            <div className="row ">
              <div className="col-3 col-md-3">
              <img src={img1} className="img-fluid rounded-start" alt="Auto"/>
              </div>
              <div className="col-3 col-md-3">
              <img src={img1} className="img-fluid rounded-start" alt="Auto"/>
              </div>
              <div className="col-3 col-md-3">
              <img src={img1} className="img-fluid rounded-start" alt="Auto"/>
              </div>
              <div className="col-3  col-md-3">
              <img src={img1} className="img-fluid rounded-start" alt="Auto"/>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">{title} example</h5>
              
              <div>
                <h4>Color</h4>
                <div className='row w-50 py-1' >
                  <div  className='col-3'>
                    <button className='square rounded border-0 id-b'></button>
                  </div>
                  <div  className='col-3'>
                    <button className='square rounded border-0 id-g'></button>
                  </div>
                  <div  className='col-3'>
                    <button className='square rounded border-0 id-bk'></button>
                  </div>
                  <div  className='col-3'>
                    <button className='square rounded border-0 id-y'></button>
                  </div>
                </div>
              </div>

              <h3 className="py-1">Precio: {
                new Intl.NumberFormat('en-DE').format(130000000)
              } COP 
              </h3>
              <Link to='/collection/buy'>  <button className='buttonC'>Comprar</button> </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardCar