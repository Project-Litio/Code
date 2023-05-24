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
  }
]



const ModelAvailable = () => {
  return (
    <div className="row justify-content-around   align-items-center w-100 px-4 py-5">
      {
        cars.map(car => 
          (
          <div className="col-6 col-sm-4 col-md-3 col-lg-3 " key={car.id}>
            <CardI title={car.title} text={car.test} imageSource={car.image}></CardI>
          </div>

          )
          )
      
      }
    </div>
  )
}

export default ModelAvailable