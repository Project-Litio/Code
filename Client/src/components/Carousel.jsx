import React from 'react'
import img1 from '../assets/cars/Model 3.jpg'
import img2 from '../assets/cars/Model S.jpg'
import img3 from '../assets/cars/Model X.jpg'

const Carousel = () => {
  return (
    <div>
    <div id="carouselExampleDark" className="carousel carousel-white   slide" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src={img1} className="d-block w-100" alt="Model 3"/>
      <div className="carousel-caption d-none d-md-block active">
        <h5>Model S</h5>
        <p>Some representative placeholder content for the first slide.</p>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
    <img src={img2} className="d-block w-100" alt="Model S"/>
      <div className="carousel-caption d-none d-md-block active">
        <h5>Model 3</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src={img3} className="d-block w-100" alt="Model X"/>
      <div className="carousel-caption d-none d-md-block active ">
        <h5>Model X</h5>
        <p>Some representative placeholder content for the third slide.</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

    </div>

    
  )
}

export default Carousel