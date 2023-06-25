import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import Add from '../components/small-component/Add'
import ModelAvailable from '../components/ModelAvailable'
import Findus from '../components/Findus'
const Collection = () => {
  
  return (
    <div className='bg-white'>
    <Navbar  />
    <Carousel></Carousel>
    <Add></Add>
    <ModelAvailable></ModelAvailable>
    <Footer/>
    </div>

  )
}

export default Collection