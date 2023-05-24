import React from 'react'
import img1 from '../assets/cars/t-m-3.png'

import CardI from './CardI'
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
    "title": "Molel 3",
    "test": "Sedan",
    "image":img1
  },
  {
    "id":6,
    "title": "Molel X",
    "test": "Sedan",
    "image":img1
  },
  {
    "id":7,
    "title": "Molel Y",
    "test": "SUV",
    "image":img1
  }
]



const ModelAvailable = () => {
  return (
    <div className="row justify-content-around   align-items-center w-100 px-4 pb-4">
      {
        cars.map(car => 
          (
          <div className="col-6 col-sm-6 col-md-4 col-lg-3 " key={car.id}>
            <CardI title={car.title} text={car.test} imageSource={car.image}></CardI>
          </div>

          )
          )
      
      }
    </div>
  )
}

export default ModelAvailable