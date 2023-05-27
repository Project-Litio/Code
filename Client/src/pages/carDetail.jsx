import React from 'react'
import CardCar from '../components/vehicle/CardCar'
import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'

const carDetail = () => {
  const params = useParams()
  return (
    <div className='bg-white'>
      <Navbar></Navbar>
      <div className='container'>
      <CardCar title={params.id} text={params.id.test} ></CardCar>
      </div>
      

    </div>
  )
}

export default carDetail