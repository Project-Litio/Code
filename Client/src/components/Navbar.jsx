import React from 'react'
import img from '../assets/logo.png'


const Navbar = () => {
  return (
<nav className="navbar navbar-expand-lg bg-transparent fixed-top" data-bs-theme="dark">
  <div className="container pt-3">
    <a className="navbar-brand " href="#"><img src={img} alt="Litio" width={180} />  </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse navbar-brand " id="navbarNav">
      <ul className="navbar-nav  ms-auto px-3 fs-4">
        <li className="nav-item mx-3">
          <a className="nav-link active" aria-current="page" href="#">Inicio</a>
        </li>
        <li className="nav-item mx-3">
          <a className="nav-link" href="#">Colección</a>
        </li>
        <li className="nav-item mx-3">
          <a className="nav-link" href="#">Reparación</a>
        </li>
        <li className="nav-item mx-3">
          <a className="nav-link ">Sobre Nosotros</a>
        </li>

        <li className="nav-item mx-3">
          <a className="nav-link ">Identificate</a>
        </li> 
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar