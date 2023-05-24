import React from 'react'
import img from '../assets/logo.png'
import './style.css'

const Footer = () => {
  return (
    <div>
      <footer className="footer ft pt-3 pb-2 ">
        <div className="container">
          <div className="row justify-content-between text-center">
            <div className="col-md-2 col-sm-2 col-3">
              <h5>LITIO</h5>

            </div>
            <div className="col-lg-2 col-sm-2 col-3">
              <h5>Copyright&copy;  </h5>
            </div>
            <div className="col-lg-2 col-sm-2 col-3">
              <h5>Incio</h5>

            </div>
            <div className="col-lg-2 col-sm-2 col-3">
              <h5>Coleccion</h5>
            </div>
            <div className="col-lg-2 col-sm-2  col-0">
              <h5>Idenfificate</h5>

            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer