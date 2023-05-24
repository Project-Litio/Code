import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Carousel from '../components/carousel'
import Add from '../components/Add'
import ModelAvailable from '../components/ModelAvailable'
import Findus from '../components/Findus'
const Collection = () => {
  
  return (
    <div className='bg-white'>
    <Navbar  />
    <Carousel></Carousel>
    <Add></Add>
    <ModelAvailable></ModelAvailable>
    <Findus></Findus>
    <Footer/>
    </div>

  )
}

export default Collection