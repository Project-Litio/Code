import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'
import Add from '../components/small-component/Add'
import ModelAvailable from '../components/ModelAvailable'
import Findus from '../components/Findus'
import { motion } from 'framer-motion'
const Collection = () => {
  
  return (
    <motion.div layout className='bg-white'>
    <Navbar  />
    <Carousel></Carousel>
    <Add></Add>
    <ModelAvailable></ModelAvailable>
    <Footer/>
    </motion.div>

  )
}

export default Collection