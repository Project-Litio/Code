import React from 'react'
import './style.css'
import {Link} from "react-router-dom";

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
              <Link className="navbar-brand " to='/'>
                <h5>Inicio</h5>
              </Link>
            </div>
            <div className="col-lg-2 col-sm-2 col-3">
              <Link className="navbar-brand " to='/collection'>
                <h5>Coleccion</h5>
              </Link>
            </div>
            <div className="col-lg-2 col-sm-2  col-0">
              <Link className="navbar-brand " to='/login'>
                <h5>Idenfificate</h5>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer