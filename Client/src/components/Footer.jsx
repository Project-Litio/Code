import React from 'react'
import img from '../assets/logo.png'
import './style.css'

const Footer = () => {
  return (
    <div>
      <footer className="footer ft py-5 ">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-md-4 col-sm-3 text-center ">
              <img src={img} alt="Litio" className="img-fluid  mb-3" width={180} />
              <p className="text-center ft">Copyright &copy; 2023 Company Name</p>
            </div>
            <div className="col-lg-2 col-sm-2 col-3">
              <h4>Navegación</h4>
              <ul className="list-unstyled">
                <li><a href="#">Inicio</a></li>
                <li><a href="#">Colección</a></li>
                <li><a href="#">Reparaciones</a></li>
                <li><a href="#">Nosotros</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-sm-2 col-3">
              <h4>Soporte</h4>
              <ul className="list-unstyled">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-sm-2 col-3">
              <h4>Socios</h4>
              <ul className="list-unstyled">
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">LinkedIn</a></li>
                <li><a href="#">Instagram</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer