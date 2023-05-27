import React from 'react'
import img1 from '../../assets/cars/t-m-3.png'


const CardCar = ({title,text}) => {
  return (
    <div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-6">
            <img src={img1} className="img-fluid rounded-start" alt="Auto"/>
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">{title} example</h5>
              <h3 className="">Precio: {
                new Intl.NumberFormat('en-DE').format(130000000)
              } COP </h3>
              <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardCar