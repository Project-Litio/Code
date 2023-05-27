import React from 'react'
import img1 from '../assets/cars/t-m-3.png'
import {
  Link
} from "react-router-dom";
import CardI from './small-component/CardI'


const cars =[
  {
    "id":1,
    "title": "Molel S",
    "test": "Sedan",
    "image":img1
  },
  {
    "id":2,
    "title": "Molel 3",
    "test": "Sedan",
    "image":img1
  },
  {
    "id":3,
    "title": "Molel X",
    "test": "Sedan",
    "image":img1
  },
  {
    "id":4,
    "title": "Molel Y",
    "test": "SUV",
    "image":img1
  },
  {
    "id":5,
    "title": "Renault Zoe ",
    "test": "SUV",
    "image":img1
  },
  {
    "id":6,
    "title": "kia Soul EV",
    "test": "Sedan",
    "image":img1
  },
  {
    "id":7,
    "title": "Bmw IX Xdrive",
    "test": "SUV",
    "image":img1
  }
]

export {cars}


const ModelAvailable = () => {
  return (
    <div className='container'>
      <h2 className='px-3'>NUESTROS VEHÍCULOS</h2>
    <div className="row justify-content-around  pb-4 ">
      {
        cars.map(car => 
          (
          <div className="col-6 col-sm-6 col-md-4 col-lg-4 " key={car.id}>
            <Link to={`/collection/${car.title}`} > <CardI title={car.title} text={car.test} imageSource={car.image}></CardI> </Link>
          </div>

          )
          )
          
      
      }
    </div>
    </div>
  )
}

export default ModelAvailable