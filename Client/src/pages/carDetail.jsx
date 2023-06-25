import React from 'react'
import CardCar from '../components/vehicle/CardCar'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import CarSpecification from '../components/vehicle/CarSpecification'
import Footer from '../components/Footer'

const carDetail = () => {
  const params = useParams();
  return (
    <div className='bg-white'>
      <Navbar></Navbar>
        <div className='container py-5'>
          <CardCar title={params.brand+' '+params.model} ></CardCar>
        </div>
      <div className='container pb-5'>
      <CarSpecification></CarSpecification>
      </div>
      <Footer></Footer>
    </div>
    
  )
}

export default carDetail