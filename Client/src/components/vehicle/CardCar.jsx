import {React,useState,useEffect} from 'react'
import './style.css'
import { Link, useLocation } from 'react-router-dom';
import { CirclePicker } from 'react-color';




  const CardCar = () => {

  const location = useLocation();
  const data = location.state;
  console.log(data);


  return (
    <div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6">
            <img src={"https://res.cloudinary.com/dao5kgzkm/"+data.image} className="img-fluid rounded-start" alt="Auto"/>
          </div>

          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">{data.brand} {data.model} </h5>
              
              <div>
                <h4>Color</h4>
                <div className='row w-50 py-1' >
                  <div  className='col-3'>

                  </div>
                </div>
              </div>

              <h3 className="py-1">Precio: {
                new Intl.NumberFormat('en-DE').format(data.price)
              } COP 
              </h3>
              <Link to='/collection/buy' state={data}>  <button className='buttonC'>Comprar</button> </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardCar