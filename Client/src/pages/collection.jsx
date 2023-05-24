import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Carousel from '../components/carousel'
import Add from '../components/Add'
const Collection = () => {
  return (
    <div className='bg-white'>
    <Navbar  />
    <Carousel></Carousel>
    <Add></Add>
    <Footer/>
    </div>

  )
}

export default Collection